import psl from "psl";

export function getBaseDomain(url) {
    const domain = new URL(url).hostname;
    const parsed = psl.parse(domain);
  
    if (parsed.error) throw new Error("Invalid domain");
  
    return parsed.domain;
  }