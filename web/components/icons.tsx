// Icon set — Font Awesome (Free), wrapped so every consumer keeps using the
// same small set of named components regardless of which FA style/glyph
// backs each one.
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBagShopping,
  faMagnifyingGlass,
  faBars,
  faXmark,
  faChevronRight,
  faHeart as faHeartSolid,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular, faCircleUser, faEnvelope, faCommentDots } from '@fortawesome/free-regular-svg-icons';
import { faWhatsapp, faInstagram } from '@fortawesome/free-brands-svg-icons';

type IconProps = { className?: string };

export function BagIcon({ className }: IconProps) {
  return <FontAwesomeIcon icon={faBagShopping} className={className} />;
}

export function HeartIcon({ className, filled }: IconProps & { filled?: boolean }) {
  return <FontAwesomeIcon icon={filled ? faHeartSolid : faHeartRegular} className={className} />;
}

export function SearchIcon({ className }: IconProps) {
  return <FontAwesomeIcon icon={faMagnifyingGlass} className={className} />;
}

export function UserIcon({ className }: IconProps) {
  return <FontAwesomeIcon icon={faCircleUser} className={className} />;
}

export function MenuIcon({ className }: IconProps) {
  return <FontAwesomeIcon icon={faBars} className={className} />;
}

export function CloseIcon({ className }: IconProps) {
  return <FontAwesomeIcon icon={faXmark} className={className} />;
}

export function ChevronIcon({ className }: IconProps) {
  return <FontAwesomeIcon icon={faChevronRight} className={className} />;
}

export function ChatIcon({ className }: IconProps) {
  return <FontAwesomeIcon icon={faCommentDots} className={className} />;
}

export function WhatsAppIcon({ className }: IconProps) {
  return <FontAwesomeIcon icon={faWhatsapp} className={className} />;
}

export function InstagramIcon({ className }: IconProps) {
  return <FontAwesomeIcon icon={faInstagram} className={className} />;
}

export function MailIcon({ className }: IconProps) {
  return <FontAwesomeIcon icon={faEnvelope} className={className} />;
}

export function PhoneIcon({ className }: IconProps) {
  return <FontAwesomeIcon icon={faPhone} className={className} />;
}
