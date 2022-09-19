const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

const generateHashFromValue = (value) => {
  const stringValue = typeof value !== "string" ? JSON.stringify(value) : value
  return crypto.createHash("sha3-512").update(stringValue).digest("hex");
}

const getCandidateFromEvent = (event) => {
  let candidate;
  if (event.partitionKey) {
    candidate = event.partitionKey;
  } else {
    candidate = generateHashFromValue(event)
  }
  return typeof candidate !== "string" ? JSON.stringify(candidate) : candidate
};

exports.deterministicPartitionKey = (event) => {
  let candidate = TRIVIAL_PARTITION_KEY;

  if (event) {
    candidate = getCandidateFromEvent(event)
  }
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    return generateHashFromValue(candidate);
  }
  return candidate;
};

exports.generateHashFromValue = generateHashFromValue;
