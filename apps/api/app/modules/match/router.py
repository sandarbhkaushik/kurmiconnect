from fastapi import APIRouter, Query, status

from app.core.deps import CurrentUserDep, DbDep
from app.modules.match import service
from app.modules.match.schemas import MatchResponse

router = APIRouter(prefix="/matches", tags=["matches"])


@router.get("/today", response_model=list[MatchResponse])
async def get_todays_matches(
    db: DbDep,
    user_id: CurrentUserDep,
    limit: int = Query(20, ge=1, le=50),
) -> list[MatchResponse]:
    return await service.get_todays_matches(db, user_id, limit)


@router.get("/shortlist", response_model=list[MatchResponse])
async def get_shortlist(db: DbDep, user_id: CurrentUserDep) -> list[MatchResponse]:
    return await service.get_shortlist(db, user_id)


@router.post("/{match_id}/view", response_model=MatchResponse)
async def view_match(match_id: str, db: DbDep, user_id: CurrentUserDep) -> MatchResponse:
    return await service.view_match(db, match_id, user_id)


@router.post("/{match_id}/shortlist", response_model=MatchResponse)
async def shortlist_match(match_id: str, db: DbDep, user_id: CurrentUserDep) -> MatchResponse:
    return await service.set_shortlisted(db, match_id, user_id, True)


@router.delete(
    "/{match_id}/shortlist", response_model=MatchResponse, status_code=status.HTTP_200_OK
)
async def unshortlist_match(match_id: str, db: DbDep, user_id: CurrentUserDep) -> MatchResponse:
    return await service.set_shortlisted(db, match_id, user_id, False)
