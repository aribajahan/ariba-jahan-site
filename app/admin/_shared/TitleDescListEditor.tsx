type Item = { title: string; description: string };

export default function TitleDescListEditor({
  items,
  onChange,
}: {
  items: Item[];
  onChange: (items: Item[]) => void;
}) {
  const update = (i: number, patch: Partial<Item>) => onChange(items.map((v, idx) => (idx === i ? { ...v, ...patch } : v)));
  const move = (i: number, dir: -1 | 1) => {
    const target = i + dir;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[i], next[target]] = [next[target], next[i]];
    onChange(next);
  };
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const add = () => onChange([...items, { title: "", description: "" }]);

  return (
    <div className="flex flex-col gap-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-[10px] p-[10px] bg-[#f7f6f4] rounded-md">
          <div className="flex flex-col gap-[2px] pt-1">
            <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="text-[10px] text-[#888] disabled:opacity-30">▲</button>
            <button type="button" onClick={() => move(i, 1)} disabled={i === items.length - 1} className="text-[10px] text-[#888] disabled:opacity-30">▼</button>
          </div>
          <div className="flex-1 flex flex-col gap-[6px]">
            <input
              value={item.title}
              onChange={(e) => update(i, { title: e.target.value })}
              placeholder="Title"
              className="border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[13px] font-semibold"
            />
            <textarea
              value={item.description}
              onChange={(e) => update(i, { description: e.target.value })}
              placeholder="Description"
              rows={2}
              className="border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[13px] resize-y"
            />
          </div>
          <span onClick={() => remove(i)} className="text-[#c44] cursor-pointer text-[13px] pt-1">✕</span>
        </div>
      ))}
      <button type="button" onClick={add} className="self-start text-xs text-[#888] border border-dashed border-[#ccc] rounded-md px-3 py-[6px]">
        + Add
      </button>
    </div>
  );
}
