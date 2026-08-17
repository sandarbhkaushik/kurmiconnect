import { z } from 'zod';

// Mirrors apps/api/app/modules/profile/models.py enums exactly.
export const genderSchema = z.enum(['male', 'female']);
export const maritalStatusSchema = z.enum([
  'never_married', 'divorced', 'widowed', 'awaiting_divorce',
]);
export const bodyTypeSchema = z.enum(['slim', 'average', 'heavy', 'athletic']);
export const complexionSchema = z.enum(['fair', 'wheatish', 'dark']);
export const ownsLandSchema = z.enum(['yes', 'no', 'skip']);

// Mirrors ProfileBasicsUpdate in apps/api/app/modules/profile/schemas.py.
export const basicsSchema = z.object({
  first_name: z.string().min(1).max(100),
  middle_name: z.string().max(100).nullable().optional(),
  last_name: z.string().min(1).max(100),
  gender: genderSchema,
  date_of_birth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD'),
  marital_status: maritalStatusSchema,
});
export type BasicsForm = z.infer<typeof basicsSchema>;

// Mirrors ProfilePhysicalUpdate.
export const physicalSchema = z.object({
  height_cm: z.coerce.number().int().min(100).max(250),
  weight_kg: z.coerce.number().int().min(20).max(300).nullable().optional(),
  body_type: bodyTypeSchema,
  complexion: complexionSchema,
  // Not .default(false): react-hook-form's `defaultValues` already supplies
  // the runtime default, and a Zod .default() gives the field a differing
  // input/output type that zodResolver's generics can't reconcile with
  // useForm<T>()'s single type parameter.
  has_physical_challenge: z.boolean(),
});
export type PhysicalForm = z.infer<typeof physicalSchema>;

// Mirrors ProfileCommunityUpdate.
export const communitySchema = z.object({
  sub_caste: z.string().min(1).max(100),
  gotra: z.string().min(1).max(100),
  same_gotra_acceptable: z.boolean(), // see has_physical_challenge comment above
  mother_tongue: z.string().min(1).max(50),
});
export type CommunityForm = z.infer<typeof communitySchema>;

// Mirrors ProfileLocationUpdate.
export const locationSchema = z.object({
  country: z.string().max(60), // see has_physical_challenge comment above re: .default()
  state: z.string().min(1).max(60),
  district: z.string().min(1).max(60),
  city: z.string().min(1).max(60),
  residing_since: z.coerce.number().int().nullable().optional(),
  is_native_place: z.boolean(),
});
export type LocationForm = z.infer<typeof locationSchema>;

// Mirrors ProfileNativeUpdate — every field optional there, so no required()s here.
export const nativeSchema = z.object({
  native_state: z.string().max(60).nullable().optional(),
  native_district: z.string().max(60).nullable().optional(),
  native_village_or_town: z.string().max(100).nullable().optional(),
  family_still_there: z.boolean().nullable().optional(),
  owns_land: ownsLandSchema.nullable().optional(),
});
export type NativeForm = z.infer<typeof nativeSchema>;

// Mirrors ProfileEducationUpdate.
export const educationSchema = z.object({
  highest_qualification: z.string().min(1).max(100),
  specialisation: z.string().max(100).nullable().optional(),
  college_university: z.string().max(150).nullable().optional(),
  year_of_passing: z.coerce.number().int().nullable().optional(),
  currently_studying: z.boolean(), // see has_physical_challenge comment above
});
export type EducationForm = z.infer<typeof educationSchema>;

// Mirrors ProfileFullResponse — the shape GET /profiles/me and every PATCH
// response return. Hand-written (no shared-types codegen yet, per
// docs/CLAUDE.md's aspirational packages/shared-types); keep in sync with
// apps/api/app/modules/profile/schemas.py by hand until that exists.
export interface ProfileResponse {
  id: string;
  tenant_id: string;
  user_id: string;

  first_name: string | null;
  middle_name: string | null;
  last_name: string | null;
  gender: z.infer<typeof genderSchema> | null;
  date_of_birth: string | null;
  marital_status: z.infer<typeof maritalStatusSchema> | null;

  height_cm: number | null;
  weight_kg: number | null;
  body_type: z.infer<typeof bodyTypeSchema> | null;
  complexion: z.infer<typeof complexionSchema> | null;
  has_physical_challenge: boolean;

  sub_caste: string | null;
  gotra: string | null;
  same_gotra_acceptable: boolean;
  mother_tongue: string | null;

  country: string;
  state: string | null;
  district: string | null;
  city: string | null;
  residing_since: number | null;
  is_native_place: boolean;

  native_state: string | null;
  native_district: string | null;
  native_village_or_town: string | null;
  family_still_there: boolean | null;
  owns_land: z.infer<typeof ownsLandSchema> | null;

  highest_qualification: string | null;
  specialisation: string | null;
  college_university: string | null;
  year_of_passing: number | null;
  currently_studying: boolean;

  is_complete: boolean;
  created_at: string;
  updated_at: string;
}

export const SUB_CASTES = z.object({
  id: z.string(),
  name_hi: z.string(),
  name_en: z.string(),
  display_order: z.number(),
});
export type SubCasteOption = z.infer<typeof SUB_CASTES>;

export const GOTRAS = z.object({
  id: z.string(),
  name_hi: z.string(),
  name_en: z.string(),
});
export type GotraOption = z.infer<typeof GOTRAS>;
