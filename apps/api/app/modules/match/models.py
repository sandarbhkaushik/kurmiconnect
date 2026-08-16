from datetime import UTC, datetime

from sqlalchemy import JSON, Boolean, DateTime, ForeignKey, Index, Integer, String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column

from app.core.db import TenantBase


def _now() -> datetime:
    return datetime.now(UTC)


class Match(TenantBase):
    """One row per matched pair. Pair is stored in canonical order
    (user_a_id < user_b_id lexicographically) so a pair never gets a
    duplicate row regardless of who triggered generation.

    match_score is min(score from A's perspective, score from B's
    perspective) — a match only counts as good if it clears the bar for
    both people. score_breakdown keeps both directional breakdowns for
    transparency/debugging: {"a_to_b": {...}, "b_to_a": {...}}.
    """

    __tablename__ = "matches"
    __table_args__ = (
        UniqueConstraint("user_a_id", "user_b_id", name="uq_matches_user_pair"),
        Index("ix_matches_tenant_user_a_score", "tenant_id", "user_a_id", "match_score"),
        Index("ix_matches_tenant_user_b_score", "tenant_id", "user_b_id", "match_score"),
    )

    user_a_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("users.id"), nullable=False, index=True
    )
    user_b_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("users.id"), nullable=False, index=True
    )
    match_score: Mapped[int] = mapped_column(Integer, nullable=False)
    score_breakdown: Mapped[dict[str, dict[str, int]]] = mapped_column(
        JSON, nullable=False, default=dict
    )
    generated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=_now, nullable=False
    )
    viewed_by_a: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    viewed_by_b: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    shortlisted_by_a: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    shortlisted_by_b: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
