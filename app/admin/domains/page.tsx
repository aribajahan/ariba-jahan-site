import domains from "../../../content/domains.json";

export default function AdminDomains() {
  return (
    <div className="max-w-[720px] p-10">
      <div className="text-xs font-semibold text-[#888] mb-[6px]">Site-wide</div>
      <h1 className="text-2xl mb-6">Domains</h1>

      <div className="flex flex-col gap-3 mb-5">
        {domains.map((d) => (
          <div key={d.domain} className="bg-white border border-[#e2e0dc] rounded-[10px] p-5 flex justify-between items-center">
            <div>
              <strong className="text-sm">{d.domain}</strong>
              <div className="text-xs text-[#2a7a3e] mt-[2px]">{d.status}</div>
            </div>
            <span className="text-xs text-[#888]">Managed in Vercel</span>
          </div>
        ))}
      </div>

      <div className="p-[14px] bg-[#FFF7E8] border border-[#F0DFB0] rounded-lg text-[13px] text-[#7a5f1f] leading-[1.5]">
        Domains and subdomains are DNS/hosting settings, not content. They&rsquo;re configured once in Vercel, then just listed here for visibility. A future product line (e.g. a course or community) could live on its own subdomain without touching the main site&rsquo;s code.
      </div>
    </div>
  );
}
