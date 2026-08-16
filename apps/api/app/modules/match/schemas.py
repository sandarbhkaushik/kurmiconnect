from datetime import datetime

from pydantic import BaseModel

from app.modules.profile.models import ProfessionCategory


class MatchMiniProfile(BaseModel):
    """Card-sized profile summary for match listings. Built by service.py
    from Profile + ProfilePhoto rows — age and main_photo_url are computed,
    not raw columns, so this is constructed manually rather than via
    model_validate(profile)."""

    profile_id: str
    user_id: str
    first_name: str | None
    age: int | None
    city: str | None
    sub_caste: str | None
    profession_category: ProfessionCategory | None
    highest_qualification: str | None
    main_photo_url: str | None


class MatchResponse(BaseModel):
    match_id: str
    profile: MatchMiniProfile
    match_score: int
    score_breakdown: dict[str, dict[str, int]]
    is_viewed: bool
    is_shortlisted: bool
    generated_at: datetime
