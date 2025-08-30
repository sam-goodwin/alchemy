import { Netmask } from "netmask";
import { inspect } from "node:util";

function sortNetmasks(netmasks: string[]) {
  return netmasks.sort((a, b) => {
    const aNetmask = new Netmask(a);
    const bNetmask = new Netmask(b);

    if (aNetmask.bitmask === bNetmask.bitmask) {
      return aNetmask.netLong - bNetmask.netLong;
    }

    return aNetmask.bitmask - bNetmask.bitmask;
  });
}

if (import.meta.main) {
  console.log(
    inspect(
      sortNetmasks([
        "10.0.0.0/8",
        "172.16.0.0/12",
        "192.168.0.0/16",
        "192.168.2.0/24",
        "192.168.100.0/24",
        "192.168.1.128/25",
      ]),
      {
        depth: Number.POSITIVE_INFINITY,
        colors: true,
      },
    ),
  );
}

export { sortNetmasks };
