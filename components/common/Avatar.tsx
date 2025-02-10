import Image from "next/image";

interface AvatarProps {
  profileImageSrc: string;
  width: number;
  height: number;
}

function Avatar({ profileImageSrc, width, height }: AvatarProps) {
  return (
    <div>
      <Image
        src={profileImageSrc}
        alt="profile image"
        width={width}
        height={height}
      />
    </div>
  );
}

export default Avatar;
