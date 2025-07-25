import { Dialog, DialogContent } from '@/components/ui/dialog';
import VideoCard from '@/components/VideoCard';

interface VideoDetailDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  countryName?: string;
}

export default function VideoDetailDialog({
  isOpen,
  onOpenChange,
  countryName,
}: VideoDetailDialogProps) {
  if (!countryName) return null;

  //get video info by country name

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className='p-8'>
        <VideoCard countryName={countryName} />
      </DialogContent>
    </Dialog>
  );
}
