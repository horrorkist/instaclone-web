import InteractiveUsername from "./InteractiveUsername";
import Avatar from "./Avatar";

interface NameCardProps {
  avatar?: string;
  username: string;
}

function NameCard({ avatar, username }: NameCardProps) {
  return (
    <span className="flex items-center gap-x-3">
      <Avatar avatar={avatar} />
      <InteractiveUsername username={username} />
    </span>
  );
}

export default NameCard;
