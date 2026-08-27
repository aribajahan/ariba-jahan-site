export default function StringListEditor({
  items,
  onChange,
}: {
  items: string[];
  onChange: (items: string[]) => void;
}) {
  const update = (i: number, value: string) => onChange(items.map((v, idx) => (idx === i ? value : v)));
  const move = (i: number, dir: -1 | 1) => {
    const target = i + dir;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[i], next[target]] = [next[target], next[i]];
    onChange(next);
  };
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const add = () => onChange([...items, ""]);

  return (
    <div className="flex flex-col gap-2">
      {items.map((value, i) => (
        <div key={i} className="flex gap-[10px] items-center p-[10px] bg-[#f7f6f4] rounded-md">
          <div className="flex flex-col gap-[2px]">
            <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="text-[10px] text-[#888] disabled:opacity-30">▲</button>
            <button type="button" onClick={() => move(i, 1)} disabled={i === items.length - 1} className="text-[10px] text-[#888] disabled:opacity-30">▼</button>
          </div>
          <input
            value={value}
            onChange={(e) => update(i, e.target.value)}
            className="flex-1 border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[13px]"
          />
          <span onClick={() => remove(i)} className="text-[#c44] cursor-pointer text-[13px]">✕</span>
        </div>
      ))}
      <button type="button" onClick={add} className="self-start text-xs text-[#888] border border-dashed border-[#ccc] rounded-md px-3 py-[6px]">
        + Add
      </button>
    </div>
  );
}
