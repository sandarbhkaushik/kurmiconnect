import { z } from 'zod';

// Mirrors apps/api/app/modules/profile/models.py enums exactly.
export const genderSchema = z.enum(['male', 'female']);
export const maritalStatusSchema = z.enum([
  'never_married', 'divorced', 'widowed', 'awaiting_divorce',
]);
export const bodyTypeSchema = z.enum(['slim', 'average', 'heavy', 'athletic']);
export const complexionSchema = z.enum(['fair', 'wheatish', 'dark']);
export const ownsLandSchema = z.enum(['yes', 'no', 'skip']);
export const professionCategorySchema = z.enum([
  'government', 'private', 'business', 'agriculture', 'professional', 'student',
]);
export const dietSchema = z.enum(['veg', 'egg', 'non_veg', 'jain']);
export const drinkingSchema = z.enum(['never', 'occasionally', 'socially']);
export const smokingSchema = z.enum(['never', 'occasionally']);
export const familyTypeSchema = z.enum(['joint', 'nuclear']);
export const familyValuesSchema = z.enum(['orthodox', 'traditional', 'moderate', 'liberal']);
export const photoVisibilitySchema = z.enum(['all', 'premium_only', 'on_request']);
export const partnerManglikSchema = z.enum(['no_only', 'doesnt_matter', 'anshik_ok']);

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

// Mirrors ProfileProfessionUpdate.
export const professionSchema = z.object({
  profession_category: professionCategorySchema,
  specific_role: z.string().max(100).nullable().optional(),
  designation: z.string().max(100).nullable().optional(),
  company: z.string().max(150).nullable().optional(),
  work_location: z.string().max(100).nullable().optional(),
  annual_income: z.coerce.number().int().min(0).nullable().optional(),
  income_verify_requested: z.boolean(), // see has_physical_challenge comment above
});
export type ProfessionForm = z.infer<typeof professionSchema>;

// Mirrors ProfileLifestyleUpdate.
export const lifestyleSchema = z.object({
  diet: dietSchema,
  drinking: drinkingSchema,
  smoking: smokingSchema,
  hobbies: z.array(z.string()).max(6),
  languages: z.array(z.string()),
});
export type LifestyleForm = z.infer<typeof lifestyleSchema>;

// Mirrors ProfileFamilyUpdate.
export const familySchema = z.object({
  father_name: z.string().max(150).nullable().optional(),
  father_occupation: z.string().max(100).nullable().optional(),
  mother_name: z.string().max(150).nullable().optional(),
  mother_occupation: z.string().max(100).nullable().optional(),
  brothers_count: z.coerce.number().int().min(0),
  brothers_married_count: z.coerce.number().int().min(0),
  sisters_count: z.coerce.number().int().min(0),
  sisters_married_count: z.coerce.number().int().min(0),
  family_type: familyTypeSchema.nullable().optional(),
  family_values: familyValuesSchema.nullable().optional(),
});
export type FamilyForm = z.infer<typeof familySchema>;

// Mirrors ProfileHoroscopeUpdate. time_of_birth is free-text "HH:MM" for
// now — same "plain input over new picker dependency" call as DOB.
export const horoscopeSchema = z.object({
  believes_in_kundli_matching: z.boolean(),
  time_of_birth: z.string().nullable().optional(),
  place_of_birth: z.string().max(150).nullable().optional(),
  manglik_status: z.string().max(30).nullable().optional(),
  nakshatra: z.string().max(50).nullable().optional(),
  rashi: z.string().max(50).nullable().optional(),
});
export type HoroscopeForm = z.infer<typeof horoscopeSchema>;

// Mirrors ProfileAboutUpdate. photo_visibility isn't exposed in the UI
// (mockup doesn't show a control for it) — always submitted as 'all',
// matching the backend's own default.
export const aboutSchema = z.object({
  about_me: z.string().max(500).nullable().optional(),
  partner_expectation_summary: z.string().max(500).nullable().optional(),
  photo_visibility: photoVisibilitySchema,
});
export type AboutForm = z.infer<typeof aboutSchema>;

// Mirrors ProfilePreferencesUpdate in full. Each prefs-*.tsx screen only
// owns a subset of these 16 fields (see the .pick()s below) — the backend
// now does a true partial merge (exclude_unset), so submitting a subset
// object is exactly correct and won't clobber the other screens' fields.
export const preferencesSchema = z.object({
  partner_age_min: z.coerce.number().int().min(18).max(100).nullable().optional(),
  partner_age_max: z.coerce.number().int().min(18).max(100).nullable().optional(),
  partner_height_min: z.coerce.number().int().min(100).max(250).nullable().optional(),
  partner_height_max: z.coerce.number().int().min(100).max(250).nullable().optional(),
  partner_marital_status: z.array(z.string()),
  partner_manglik: partnerManglikSchema,
  partner_diet: z.array(z.string()),
  partner_sub_castes: z.array(z.string()),
  partner_same_gotra_acceptable: z.boolean(),
  partner_other_castes_acceptable: z.boolean(),
  partner_states: z.array(z.string()),
  partner_languages: z.array(z.string()),
  partner_professions: z.array(z.string()),
  partner_min_education: z.string().max(100).nullable().optional(),
  partner_min_income: z.coerce.number().int().min(0).nullable().optional(),
  partner_want_working_professional: z.boolean(),
});
export type PreferencesForm = z.infer<typeof preferencesSchema>;

export const prefsBasicSchema = preferencesSchema.pick({
  partner_age_min: true,
  partner_age_max: true,
  partner_height_min: true,
  partner_height_max: true,
  partner_marital_status: true,
  partner_manglik: true,
  partner_diet: true,
});
export type PrefsBasicForm = z.infer<typeof prefsBasicSchema>;

export const prefsCommunitySchema = preferencesSchema.pick({
  partner_sub_castes: true,
  partner_same_gotra_acceptable: true,
  partner_other_castes_acceptable: true,
  partner_states: true,
  partner_languages: true,
});
export type PrefsCommunityForm = z.infer<typeof prefsCommunitySchema>;

export const prefsCareerSchema = preferencesSchema.pick({
  partner_min_education: true,
  partner_professions: true,
  partner_min_income: true,
  partner_want_working_professional: true,
});
export type PrefsCareerForm = z.infer<typeof prefsCareerSchema>;

export type PreferencesResponse = PreferencesForm;

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

  profession_category: z.infer<typeof professionCategorySchema> | null;
  specific_role: string | null;
  designation: string | null;
  company: string | null;
  work_location: string | null;
  annual_income: number | null;
  income_verify_requested: boolean;

  diet: z.infer<typeof dietSchema> | null;
  drinking: z.infer<typeof drinkingSchema> | null;
  smoking: z.infer<typeof smokingSchema> | null;
  hobbies: string[];
  languages: string[];

  father_name: string | null;
  father_occupation: string | null;
  mother_name: string | null;
  mother_occupation: string | null;
  brothers_count: number;
  brothers_married_count: number;
  sisters_count: number;
  sisters_married_count: number;
  family_type: z.infer<typeof familyTypeSchema> | null;
  family_values: z.infer<typeof familyValuesSchema> | null;

  believes_in_kundli_matching: boolean;
  time_of_birth: string | null;
  place_of_birth: string | null;
  manglik_status: string | null;
  nakshatra: string | null;
  rashi: string | null;

  about_me: string | null;
  partner_expectation_summary: string | null;
  photo_visibility: z.infer<typeof photoVisibilitySchema>;

  preferences: PreferencesResponse | null;

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
