import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import type {
  BasicsForm,
  CommunityForm,
  EducationForm,
  LocationForm,
  NativeForm,
  PhysicalForm,
  ProfileResponse,
} from '@/lib/schemas/profile';

const PROFILE_QUERY_KEY = ['profile', 'me'];

/** GET /profiles/me — the single source of truth every onboarding screen
 * reads its defaultValues from. Cached and shared across screens by
 * TanStack Query; PATCH mutations below update this cache directly on
 * success rather than duplicating profile state locally. */
export function useProfile() {
  return useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: async () => (await api.get<ProfileResponse>('/profiles/me')).data,
  });
}

function useUpdateSection<TForm>(section: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: TForm) =>
      (await api.patch<ProfileResponse>(`/profiles/me/${section}`, data)).data,
    onSuccess: updated => {
      queryClient.setQueryData(PROFILE_QUERY_KEY, updated);
    },
  });
}

export const useUpdateBasics = () => useUpdateSection<BasicsForm>('basics');
export const useUpdatePhysical = () => useUpdateSection<PhysicalForm>('physical');
export const useUpdateCommunity = () => useUpdateSection<CommunityForm>('community');
export const useUpdateLocation = () => useUpdateSection<LocationForm>('location');
export const useUpdateNative = () => useUpdateSection<NativeForm>('native');
export const useUpdateEducation = () => useUpdateSection<EducationForm>('education');

export function useSubCastes() {
  return useQuery({
    queryKey: ['profile', 'lookups', 'sub-castes'],
    queryFn: async () =>
      (await api.get('/profiles/lookups/sub-castes')).data as {
        id: string; name_hi: string; name_en: string; display_order: number;
      }[],
    staleTime: Infinity, // tenant-scoped lookup data, effectively static
  });
}

export function useGotras() {
  return useQuery({
    queryKey: ['profile', 'lookups', 'gotras'],
    queryFn: async () =>
      (await api.get('/profiles/lookups/gotras')).data as {
        id: string; name_hi: string; name_en: string;
      }[],
    staleTime: Infinity,
  });
}
