/**
 * 🗳️ Panchayat Election System - Capstone
 *
 * Village ki panchayat election ka system bana! Yeh CAPSTONE challenge hai
 * jisme saare function concepts ek saath use honge:
 * closures, callbacks, HOF, factory, recursion, pure functions.
 *
 * Functions:
 *
 *   1. createElection(candidates)
 *      - CLOSURE: private state (votes object, registered voters set)
 *      - candidates: array of { id, name, party }
 *      - Returns object with methods:
 *
 *      registerVoter(voter)
 *        - voter: { id, name, age }
 *        - Add to private registered set. Return true.
 *        - Agar already registered or voter invalid, return false.
 *        - Agar age < 18, return false.
 *
 *      castVote(voterId, candidateId, onSuccess, onError)
 *        - CALLBACKS: call onSuccess or onError based on result
 *        - Validate: voter registered? candidate exists? already voted?
 *        - If valid: record vote, call onSuccess({ voterId, candidateId })
 *        - If invalid: call onError("reason string")
 *        - Return the callback's return value
 *
 *      getResults(sortFn)
 *        - HOF: takes optional sort comparator function
 *        - Returns array of { id, name, party, votes: count }
 *        - If sortFn provided, sort results using it
 *        - Default (no sortFn): sort by votes descending
 *
 *      getWinner()
 *        - Returns candidate object with most votes
 *        - If tie, return first candidate among tied ones
 *        - If no votes cast, return null
 *
 *   2. createVoteValidator(rules)
 *      - FACTORY: returns a validation function
 *      - rules: { minAge: 18, requiredFields: ["id", "name", "age"] }
 *      - Returned function takes a voter object and returns { valid, reason }
 *
 *   3. countVotesInRegions(regionTree)
 *      - RECURSION: count total votes in nested region structure
 *      - regionTree: { name, votes: number, subRegions: [...] }
 *      - Sum votes from this region + all subRegions (recursively)
 *      - Agar regionTree null/invalid, return 0
 *
 *   4. tallyPure(currentTally, candidateId)
 *      - PURE FUNCTION: returns NEW tally object with incremented count
 *      - currentTally: { "cand1": 5, "cand2": 3, ... }
 *      - Return new object where candidateId count is incremented by 1
 *      - MUST NOT modify currentTally
 *      - If candidateId not in tally, add it with count 1
 *
 * @example
 *   const election = createElection([
 *     { id: "C1", name: "Sarpanch Ram", party: "Janata" },
 *     { id: "C2", name: "Pradhan Sita", party: "Lok" }
 *   ]);
 *   election.registerVoter({ id: "V1", name: "Mohan", age: 25 });
 *   election.castVote("V1", "C1", r => "voted!", e => "error: " + e);
 *   // => "voted!"
 */
export function createElection(candidates) {
  const candidateList = Array.isArray(candidates) ? candidates : [];

  // private state
  const registeredVoters = new Set();
  const votes = {};
  const votedVoters = new Set();

  // initialize votes for known candidates
  for (const candidate of candidateList) {
    if (candidate && typeof candidate.id === "string") {
      votes[candidate.id] = 0;
    }
  }

  const isValidVoter = (voter) => {
    return (
      voter &&
      typeof voter === "object" &&
      typeof voter.id === "string" &&
      voter.id.trim() !== "" &&
      typeof voter.name === "string" &&
      voter.name.trim() !== "" &&
      typeof voter.age === "number" &&
      Number.isInteger(voter.age)
    );
  };

  const findCandidate = (candidateId) => {
    return candidateList.find(
      (candidate) => candidate && candidate.id === candidateId
    );
  };

  return {
    registerVoter(voter) {
      if (!isValidVoter(voter)) return false;
      if (voter.age < 18) return false;
      if (registeredVoters.has(voter.id)) return false;

      registeredVoters.add(voter.id);
      return true;
    },

    castVote(voterId, candidateId, onSuccess, onError) {
      const successCb =
        typeof onSuccess === "function" ? onSuccess : (value) => value;
      const errorCb =
        typeof onError === "function" ? onError : (value) => value;

      if (!registeredVoters.has(voterId)) {
        return errorCb("Voter not registered");
      }

      const candidate = findCandidate(candidateId);
      if (!candidate) {
        return errorCb("Candidate not found");
      }

      if (votedVoters.has(voterId)) {
        return errorCb("Voter already voted");
      }

      votedVoters.add(voterId);
      votes[candidateId] = (votes[candidateId] || 0) + 1;

      return successCb({ voterId, candidateId });
    },

    getResults(sortFn) {
      const results = candidateList.map((candidate) => ({
        id: candidate.id,
        name: candidate.name,
        party: candidate.party,
        votes: votes[candidate.id] || 0,
      }));

      if (typeof sortFn === "function") {
        return [...results].sort(sortFn);
      }

      return [...results].sort((a, b) => b.votes - a.votes);
    },

    getWinner() {
      const totalVotesCast = Object.values(votes).reduce(
        (sum, count) => sum + count,
        0
      );

      if (totalVotesCast === 0) return null;

      let winner = null;
      let maxVotes = -1;

      for (const candidate of candidateList) {
        const count = votes[candidate.id] || 0;
        if (count > maxVotes) {
          maxVotes = count;
          winner = candidate;
        }
      }

      return winner;
    },
  };
}

export function createVoteValidator(rules) {
  const minAge =
    rules &&
    typeof rules === "object" &&
    typeof rules.minAge === "number" &&
    Number.isFinite(rules.minAge)
      ? rules.minAge
      : 18;

  const requiredFields =
    rules &&
    typeof rules === "object" &&
    Array.isArray(rules.requiredFields)
      ? rules.requiredFields
      : [];

  return function (voter) {
    if (!voter || typeof voter !== "object") {
      return { valid: false, reason: "Invalid voter object" };
    }

    for (const field of requiredFields) {
      if (!(field in voter)) {
        return { valid: false, reason: `Missing field: ${field}` };
      }
    }

    if (
      typeof voter.id !== "string" ||
      voter.id.trim() === "" ||
      typeof voter.name !== "string" ||
      voter.name.trim() === ""
    ) {
      return { valid: false, reason: "Invalid voter details" };
    }

    if (
      typeof voter.age !== "number" ||
      !Number.isInteger(voter.age) ||
      voter.age < minAge
    ) {
      return { valid: false, reason: `Voter must be at least ${minAge}` };
    }

    return { valid: true, reason: "" };
  };
}

export function countVotesInRegions(regionTree) {
  if (!regionTree || typeof regionTree !== "object") return 0;

  const ownVotes =
    typeof regionTree.votes === "number" && Number.isFinite(regionTree.votes)
      ? regionTree.votes
      : 0;

  const subRegions = Array.isArray(regionTree.subRegions)
    ? regionTree.subRegions
    : [];

  return subRegions.reduce(
    (total, subRegion) => total + countVotesInRegions(subRegion),
    ownVotes
  );
}

export function tallyPure(currentTally, candidateId) {
  const tally =
    currentTally && typeof currentTally === "object" ? currentTally : {};

  return {
    ...tally,
    [candidateId]: (tally[candidateId] || 0) + 1,
  };
}