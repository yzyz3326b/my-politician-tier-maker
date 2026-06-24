import { Metadata } from "next";
import TierBoard from "@/components/TierBoard";
import EditableTitle from "@/components/EditableTitle";
import AdUnit from "@/components/AdUnit";

export const metadata: Metadata = {
  title: "Tier Maker — MY Tier",
  description: "Rank Malaysian politicians by dragging them into S through F tiers.",
};

export default function TierMakerPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <EditableTitle />
        <p className="text-sm text-gray-400">
          Drag politicians from the pool below into tiers. Click any tier label to rename it.
        </p>
      </div>
      <TierBoard />
      <AdUnit slot="SLOT_ID_TIERMAKER" className="my-2" />
    </div>
  );
}
