import { DAMAGE_TYPE, type Damage, type DamageType } from "../types";

export const DamageTracker = ({
  damage = [],
  totalPossible,
  groupBy,
  handleChange,
}: {
  damage: Damage[];
  totalPossible: number;
  groupBy: number;
  handleChange: (damage: Damage[]) => void;
}) => {
  const damageItems = [];
  for (let i = 0; i < totalPossible; i++) {
    damageItems.push(
      <div
        key={i}
        className={`w-4 h-4 flex items-center justify-center border border-[var(--primary)] bg-[var(--light-bg)]  ${groupBy && (i + 1) % groupBy === 0 ? "mr-3" : "mr-[2px]"} leading-none font-bold`}
      >
        {damage[i] && damage[i].type === DAMAGE_TYPE.Aggravated && (
          <div className="text-[var(--primary)]">X</div>
        )}
        {damage[i] && damage[i].type === DAMAGE_TYPE.Superficial && (
          <div className="text-[var(--primary)] w-1 h-full bg-[var(--primary)] rotate-40" />
        )}
      </div>,
    );
  }

  const addDamage = (type: DamageType) => {
    const firstSuperficialDamageIndex = damage.findIndex(
      (dmg) => dmg.type === DAMAGE_TYPE.Superficial,
    );

    if (
      damage.length === totalPossible &&
      type === DAMAGE_TYPE.Superficial &&
      firstSuperficialDamageIndex !== -1
    ) {
      // if at max, can convert an existing superficial damage to aggravated if adding another superficial
      handleChange([
        ...damage.slice(0, firstSuperficialDamageIndex),
        { type: DAMAGE_TYPE.Aggravated },
        ...damage.slice(firstSuperficialDamageIndex + 1),
      ]);
    } else {
      handleChange([...damage, { type }]);
    }
  };

  const removeDamage = (type: DamageType) => {
    // get index in reversed order since we want to remove the last matching damage type and findIndex works from the beginning
    const matchingIndexInReversed = [...damage]
      .reverse()
      .findIndex((dmgItem) => dmgItem.type === type);

    // no matching damage type
    if (matchingIndexInReversed === -1) {
      return;
    }
    // have to convert the index back to where it is in original array
    const lastMatchingDamageIndex = damage.length - 1 - matchingIndexInReversed;

    handleChange([
      ...damage.slice(0, lastMatchingDamageIndex),
      ...damage.slice(lastMatchingDamageIndex + 1),
    ]);
  };

  return (
    <div className="my-2">
      <div className="flex mb-4">{damageItems}</div>
      <p className="flex items-center justify-center gap-4 mb-4 leading-none">
        <button
          className="w-6 h-6 rounded-sm bg-[var(--primary)] leading-none cursor-pointer disabled:opacity-50"
          disabled={!damage.find((dmg) => dmg.type === DAMAGE_TYPE.Superficial)}
          onClick={() => removeDamage(DAMAGE_TYPE.Superficial)}
        >
          -
        </button>
        Superficial
        <button
          disabled={
            damage.length === totalPossible &&
            !damage.find((dmg) => dmg.type === DAMAGE_TYPE.Superficial)
          }
          className="w-6 h-6 rounded-sm bg-[var(--primary)] leading-none cursor-pointer disabled:opacity-50"
          onClick={() => addDamage(DAMAGE_TYPE.Superficial)}
        >
          +
        </button>
      </p>

      <p className="flex items-center justify-center gap-4 mb-4 leading-none">
        <button
          className="w-6 h-6 rounded-sm bg-[var(--primary)] leading-none cursor-pointer disabled:opacity-50"
          disabled={!damage.find((dmg) => dmg.type === DAMAGE_TYPE.Aggravated)}
          onClick={() => removeDamage(DAMAGE_TYPE.Aggravated)}
        >
          -
        </button>
        Aggravated
        <button
          disabled={damage.length === totalPossible}
          className="w-6 h-6 rounded-sm bg-[var(--primary)] leading-none cursor-pointer disabled:opacity-50"
          onClick={() => addDamage(DAMAGE_TYPE.Aggravated)}
        >
          +
        </button>
      </p>
    </div>
  );
};
