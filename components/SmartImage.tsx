import Image, { ImageProps } from 'next/image';

interface SmartImageProps extends Omit<ImageProps, 'referrerPolicy'> {
  alt: string;
}

export function SmartImage({ alt, ...props }: SmartImageProps) {
  return (
    <Image
      {...props}
      alt={alt || 'INDEPENDENT ELECTRIC BIKES'}
      referrerPolicy="no-referrer"
    />
  );
}
