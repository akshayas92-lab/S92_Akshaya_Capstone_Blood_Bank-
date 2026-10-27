const BLOOD_GROUPS = new Set([
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
]);
const URGENCY_LEVELS = new Set(["low", "medium", "high", "critical"]);

function normalizeAiRequestDraft(draft) {
  if (!draft || typeof draft !== "object" || Array.isArray(draft)) {
    throw new Error("AI response must be an object");
  }

  const normalizeText = (value) => {
    if (typeof value !== "string") {
      return null;
    }

    const trimmed = value.trim();
    return trimmed.length > 0 && trimmed.length <= 120 ? trimmed : null;
  };

  return {
    bloodGroup: BLOOD_GROUPS.has(draft.bloodGroup) ? draft.bloodGroup : null,
    unitsRequired:
      Number.isInteger(draft.unitsRequired) &&
      draft.unitsRequired >= 1 &&
      draft.unitsRequired <= 100
        ? draft.unitsRequired
        : null,
    hospitalName: normalizeText(draft.hospitalName),
    location: normalizeText(draft.location),
    urgency: URGENCY_LEVELS.has(draft.urgency) ? draft.urgency : null,
  };
}

module.exports = { normalizeAiRequestDraft };
