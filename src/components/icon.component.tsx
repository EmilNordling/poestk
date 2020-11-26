import { BaseIcon, OneAtomCommonPropType } from 'one-atom';

export namespace Icon {
  export type Props = OneAtomCommonPropType & Omit<BaseIcon.Props, 'viewBox'> & {};

  type PropsEva = Props & {};

  export const logo_text: FC<Props> = function icon_logo_text({ ...rest }) {
    return (
      <BaseIcon.h viewBox="0 0 1024.41 416.95" {...rest}>
        <path d="M285.41,400.45,138.06,253c-40.68-44.85-9.28-86,28.1-118.26L285.41,15.45c12.86-15.56,51-23,72.14,0h0a51.07,51.07,0,0,1,0,72.19l-111.89,112a11.81,11.81,0,0,0,0,16.68l111.89,112C404.18,376.53,333.61,447,285.41,400.45ZM57.25,162.29c32-29.06,65.82-65.73,63.52-112.07C122.81-2.31,81.38-1,41.72.5A41.71,41.71,0,0,0,0,42.21V374.77c2.4,45.93,44.8,42.72,79.06,41.72a41.71,41.71,0,0,0,41.71-41.72c1.6-33.68-10.2-67-34.31-90.83C48.06,250.67,15.32,208.55,57.25,162.29Z" />
        <path d="M452.45,414.26H513V122.74H436.24a2.54,2.54,0,0,0-2.53,2.54V395.52A18.74,18.74,0,0,0,452.45,414.26ZM473.34,0a44.75,44.75,0,1,0,44.75,44.75A44.76,44.76,0,0,0,473.34,0Zm264.8,115.14c-28.85.87-89.63,11.81-89.63,48.51V122.74H569.24V414.25h61.34a17.91,17.91,0,0,0,17.93-17.9v-145c12.78-63.6,70-71.45,89.65-72.24a3.81,3.81,0,0,0,3.68-3.81V118.77A3.6,3.6,0,0,0,738.14,115.14Zm207,94.55,79.27,8.94V414.25H970.86a25.71,25.71,0,0,1-25.72-25.72v-20c-11.71,25.82-33.88,45.8-69.79,48.15-62.24,4-113.48-30.89-116.65-79.53s43.11-89.93,105.35-94l84.18-5.47a49.71,49.71,0,0,0,2-13.89c0-27.54-25.19-49.86-56.26-49.86-28.53,0-52.08,18.82-55.77,43.21a1.76,1.76,0,0,1-1.74,1.54H774.73a3.4,3.4,0,0,1-3.43-3.45c2-59,54.6-101.39,126.53-101.39C971.17,113.79,1024.41,157.87,1024.41,218.63ZM945.14,322.19c.38-4.73.25-13.65,0-21.63-.13-4.37-.28-8.46-.41-11.43a4.6,4.6,0,0,0-4.89-4.37l-52.78,3.45c-32.19,2.07-49.32,11-49.32,39.1,0,23,21.5,35.34,53.7,33.24S944.68,327.74,945.14,322.19Zm0-21.63v21.63C945.52,317.46,945.39,308.54,945.14,300.56Z" />
      </BaseIcon.h>
    );
  };
  export const logo: FC<Props> = function icon_logo({ ...rest }) {
    return (
      <BaseIcon.h {...rest}>
        <path d="M374.56,485.76,197.87,309c-48.79-53.78-11.14-103.11,33.69-141.81l143-143.11c15.43-18.66,61.21-27.58,86.51,0h0a61.25,61.25,0,0,1,0,86.58L326.91,244.92a14.13,14.13,0,0,0,0,20L461.08,399.19C517,457.08,432.37,541.64,374.56,485.76ZM101,200.17c38.34-34.85,78.93-78.82,76.17-134.4,2.45-63-47.24-61.46-94.8-59.63a50,50,0,0,0-50,50V455c2.88,55.09,53.72,51.23,94.8,50a50,50,0,0,0,50-50c1.92-40.39-12.24-80.34-41.15-108.92C89.94,306.15,50.68,255.64,101,200.17Z" />
      </BaseIcon.h>
    );
  };

  export const logo_core: FC<Props> = function logo_core({ ...rest }) {
    return (
      <BaseIcon.h {...rest}>
        <defs>
          <linearGradient id="a" x1="256" y1="443.9" x2="256" y2="241.58" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#7d5bea" />
            <stop offset="1" stopColor="#000" stopOpacity="100" />
          </linearGradient>
          <linearGradient id="b" x1="256" y1="371.9" x2="256" y2="169.58" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#e24f79" />
            <stop offset="1" stopColor="#000" stopOpacity="100" />
          </linearGradient>
          <linearGradient id="c" x1="256" y1="300" x2="256" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0.37" stopColor="#7d5bea" />
            <stop offset="0.96" stopColor="#000" stopOpacity="100" />
          </linearGradient>
        </defs>
        <path
          id="logo_core_bottom"
          strokeWidth="0"
          d="M451.76,323.16,407.45,301,283.69,362.88c-15.29,7.65-40.09,7.65-55.38,0L104.55,301,60.24,323.16c-15.29,7.64-15.29,20,0,27.68l168.07,84c15.29,7.65,40.09,7.65,55.38,0l168.07-84C467.05,343.2,467.05,330.8,451.76,323.16Z"
          fill="url(#a)"
        />
        <path
          id="logo_core_middle"
          strokeWidth="0"
          d="M451.76,251.16,399.45,225,283.69,282.88c-15.29,7.65-40.09,7.65-55.38,0L112.55,225,60.24,251.16c-15.29,7.64-15.29,20,0,27.68l168.07,84c15.29,7.65,40.09,7.65,55.38,0l168.07-84C467.05,271.2,467.05,258.8,451.76,251.16Z"
          fill="url(#b)"
        />
        <path
          id="logo_core_top"
          strokeWidth="0"
          d="M 452 200 l -168.2 84 c -15.29 7.65 -40.09 7.65 -55.38 0 l -168.07 -84 c -15.29 -7.64 -15.29 -20 0 -27.68 l 168.07 -84 c 15.29 -7.65 40.09 -7.65 55.38 0 l 168.07 84 c 15.29 7.64 15.29 20 0 27.6"
          fill="url(#c)"
        />
      </BaseIcon.h>
    );
  };

  export const arrow: FC<Props> = function icon_arrow({ ...rest }) {
    return (
      <BaseIcon.h {...rest} viewBox="0 0 335 335">
        <path d="M259.12,109.05c-51.61,56.81-11.31,108.54,36,149.4C316.29,279.38,329.76,306.26,335,335V0C325.73,43.68,291.64,79.56,259.12,109.05Z" />
      </BaseIcon.h>
    );
  };

  // The following icons are from eva-icons https://akveo.github.io/eva-icons/
  // It's MIT license can be found here: https://github.com/akveo/eva-icons/blob/master/LICENSE.txt
  export const eva_person: FC<PropsEva> = function icon_eva_person({ ...rest }) {
    return (
      <BaseIcon.h viewBox="0 0 24 24" {...rest}>
        <path d="M12 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4z" />
        <path d="M18 21a1 1 0 0 0 1-1 7 7 0 0 0-14 0 1 1 0 0 0 1 1z" />
      </BaseIcon.h>
    );
  };

  export const eva_alert_triangle: FC<PropsEva> = function icon_eva_alert_triangle({ ...rest }) {
    return (
      <BaseIcon.h viewBox="0 0 24 24" {...rest}>
        <rect width="24" height="24" transform="rotate(90 12 12)" opacity="0" />
        <path d="M22.56 16.3L14.89 3.58a3.43 3.43 0 0 0-5.78 0L1.44 16.3a3 3 0 0 0-.05 3A3.37 3.37 0 0 0 4.33 21h15.34a3.37 3.37 0 0 0 2.94-1.66 3 3 0 0 0-.05-3.04zM12 17a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm1-4a1 1 0 0 1-2 0V9a1 1 0 0 1 2 0z" />
      </BaseIcon.h>
    );
  };

  export const eva_alert: FC<PropsEva> = function icon_eva_alert({ ...rest }) {
    return (
      <BaseIcon.h viewBox="0 0 24 24" {...rest}>
        <rect width="24" height="24" opacity="0" />
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 15a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm1-4a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0z" />
      </BaseIcon.h>
    );
  };

  export const eva_external_link: FC<PropsEva> = function eva_external_link({ ...rest }) {
    return (
      <BaseIcon.h viewBox="0 0 24 24" {...rest}>
        <rect width="24" height="24" opacity="0" />
        <path d="M20 11a1 1 0 0 0-1 1v6a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6a1 1 0 0 0 0-2H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-6a1 1 0 0 0-1-1z" />
        <path d="M16 5h1.58l-6.29 6.28a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L19 6.42V8a1 1 0 0 0 1 1 1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-4a1 1 0 0 0 0 2z" />
      </BaseIcon.h>
    );
  };

  export const eva_arrow_down: FC<PropsEva> = function eva_arrow_down({ ...rest }) {
    return (
      <BaseIcon.h viewBox="0 0 24 24" {...rest}>
        <rect width="24" height="24" transform="rotate(-90 12 12)" opacity="0" />
        <path d="M12 17a1.72 1.72 0 0 1-1.33-.64l-4.21-5.1a2.1 2.1 0 0 1-.26-2.21A1.76 1.76 0 0 1 7.79 8h8.42a1.76 1.76 0 0 1 1.59 1.05 2.1 2.1 0 0 1-.26 2.21l-4.21 5.1A1.72 1.72 0 0 1 12 17zm-3.91-7L12 14.82 16 10z" />
      </BaseIcon.h>
    );
  };

  export const eva_arrow_forward: FC<PropsEva> = function eva_arrow_forward({ ...rest }) {
    return (
      <BaseIcon.h viewBox="0 0 24 24" {...rest}>
        <rect width="24" height="24" transform="rotate(-90 12 12)" opacity="0" />
        <path d="M5 13h11.86l-3.63 4.36a1 1 0 0 0 1.54 1.28l5-6a1.19 1.19 0 0 0 .09-.15c0-.05.05-.08.07-.13A1 1 0 0 0 20 12a1 1 0 0 0-.07-.36c0-.05-.05-.08-.07-.13a1.19 1.19 0 0 0-.09-.15l-5-6A1 1 0 0 0 14 5a1 1 0 0 0-.64.23 1 1 0 0 0-.13 1.41L16.86 11H5a1 1 0 0 0 0 2z" />
      </BaseIcon.h>
    );
  };

  export const eva_menu: FC<PropsEva> = function eva_menu({ ...rest }) {
    return (
      <BaseIcon.h viewBox="0 0 24 24" {...rest}>
        <rect x="3" y="3" width="18" height="2" />
        <rect x="3" y="11" width="18" height="2" />
        <rect x="3" y="19" width="18" height="2" />
      </BaseIcon.h>
    );
  };

  export const eva_expand: FC<PropsEva> = function eva_expand({ ...rest }) {
    return (
      <BaseIcon.h viewBox="0 0 24 24" {...rest}>
        <rect width="24" height="24" transform="rotate(180 12 12)" opacity="0" />
        <path d="M20 5a1 1 0 0 0-1-1h-5a1 1 0 0 0 0 2h2.57l-3.28 3.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L18 7.42V10a1 1 0 0 0 1 1 1 1 0 0 0 1-1z" />
        <path d="M10.71 13.29a1 1 0 0 0-1.42 0L6 16.57V14a1 1 0 0 0-1-1 1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5a1 1 0 0 0 0-2H7.42l3.29-3.29a1 1 0 0 0 0-1.42z" />
      </BaseIcon.h>
    );
  };

  export const eva_close: FC<PropsEva> = function icon_eva_close({ ...rest }) {
    return (
      <BaseIcon.h viewBox="0 0 24 24" {...rest}>
        <rect width="24" height="24" transform="rotate(180 12 12)" opacity="0" />
        <path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z" />
      </BaseIcon.h>
    );
  };

  export const eva_eye: FC<PropsEva> = function icon_eva_eye({ ...rest }) {
    return (
      <BaseIcon.h viewBox="0 0 24 24" {...rest}>
        <circle cx="12" cy="12" r="1.5" />
        <path d="M21.87 11.5c-.64-1.11-4.16-6.68-10.14-6.5-5.53.14-8.73 5-9.6 6.5a1 1 0 0 0 0 1c.63 1.09 4 6.5 9.89 6.5h.25c5.53-.14 8.74-5 9.6-6.5a1 1 0 0 0 0-1zm-9.87 4a3.5 3.5 0 1 1 3.5-3.5 3.5 3.5 0 0 1-3.5 3.5z" />
      </BaseIcon.h>
    );
  };

  export const eva_eye_off: FC<PropsEva> = function icon_eva_eye_off({ ...rest }) {
    return (
      <BaseIcon.h viewBox="0 0 24 24" {...rest}>
        <rect width="24" height="24" opacity="0" />
        <circle cx="12" cy="12" r="1.5" />
        <path d="M15.29 18.12L14 16.78l-.07-.07-1.27-1.27a4.07 4.07 0 0 1-.61.06A3.5 3.5 0 0 1 8.5 12a4.07 4.07 0 0 1 .06-.61l-2-2L5 7.87a15.89 15.89 0 0 0-2.87 3.63 1 1 0 0 0 0 1c.63 1.09 4 6.5 9.89 6.5h.25a9.48 9.48 0 0 0 3.23-.67z" />
        <path d="M8.59 5.76l2.8 2.8A4.07 4.07 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 4.07 4.07 0 0 1-.06.61l2.68 2.68.84.84a15.89 15.89 0 0 0 2.91-3.63 1 1 0 0 0 0-1c-.64-1.11-4.16-6.68-10.14-6.5a9.48 9.48 0 0 0-3.23.67z" />
        <path d="M20.71 19.29L19.41 18l-2-2-9.52-9.53L6.42 5 4.71 3.29a1 1 0 0 0-1.42 1.42L5.53 7l1.75 1.7 7.31 7.3.07.07L16 17.41l.59.59 2.7 2.71a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z" />
      </BaseIcon.h>
    );
  };

  export const eva_trending: FC<PropsEva> = function icon_eva_trending({ ...rest }) {
    return (
      <BaseIcon.h viewBox="0 0 24 24" {...rest}>
        <rect width="24" height="24" transform="rotate(-90 12 12)" opacity="0" />
        <path d="M21 7a.78.78 0 0 0 0-.21.64.64 0 0 0-.05-.17 1.1 1.1 0 0 0-.09-.14.75.75 0 0 0-.14-.17l-.12-.07a.69.69 0 0 0-.19-.1h-.2A.7.7 0 0 0 20 6h-5a1 1 0 0 0 0 2h2.83l-4 4.71-4.32-2.57a1 1 0 0 0-1.28.22l-5 6a1 1 0 0 0 .13 1.41A1 1 0 0 0 4 18a1 1 0 0 0 .77-.36l4.45-5.34 4.27 2.56a1 1 0 0 0 1.27-.21L19 9.7V12a1 1 0 0 0 2 0V7z" />
      </BaseIcon.h>
    );
  };

  export const eva_wifi_off: FC<PropsEva> = function icon_eva_wifi_off({ ...rest }) {
    return (
      <BaseIcon.h viewBox="0 0 24 24" {...rest}>
        <rect width="24" height="24" opacity="0" />
        <circle cx="12" cy="19" r="1" />
        <path d="M12.44 11l-1.9-1.89-2.46-2.44-1.55-1.55-1.82-1.83a1 1 0 0 0-1.42 1.42l1.38 1.37 1.46 1.46 2.23 2.24 1.55 1.54 2.74 2.74 2.79 2.8 3.85 3.85a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z" />
        <path d="M21.72 7.93A13.93 13.93 0 0 0 12 4a14.1 14.1 0 0 0-4.44.73l1.62 1.62a11.89 11.89 0 0 1 11.16 3 1 1 0 0 0 .69.28 1 1 0 0 0 .72-.31 1 1 0 0 0-.03-1.39z" />
        <path d="M3.82 6.65a14.32 14.32 0 0 0-1.54 1.28 1 1 0 0 0 1.38 1.44 13.09 13.09 0 0 1 1.6-1.29z" />
        <path d="M17 13.14a1 1 0 0 0 .71.3 1 1 0 0 0 .72-1.69A9 9 0 0 0 12 9h-.16l2.35 2.35A7 7 0 0 1 17 13.14z" />
        <path d="M7.43 10.26a8.8 8.8 0 0 0-1.9 1.49A1 1 0 0 0 7 13.14a7.3 7.3 0 0 1 2-1.41z" />
        <path d="M8.53 15.4a1 1 0 1 0 1.39 1.44 3.06 3.06 0 0 1 3.84-.25l-2.52-2.52a5 5 0 0 0-2.71 1.33z" />
      </BaseIcon.h>
    );
  };

  export const eva_sync: FC<PropsEva> = function icon_eva_sync({ ...rest }) {
    return (
      <BaseIcon.h viewBox="0 0 24 24" {...rest}>
        <rect width="24" height="24" opacity="0" />
        <path d="M21.66 10.37a.62.62 0 0 0 .07-.19l.75-4a1 1 0 0 0-2-.36l-.37 2a9.22 9.22 0 0 0-16.58.84 1 1 0 0 0 .55 1.3 1 1 0 0 0 1.31-.55A7.08 7.08 0 0 1 12.07 5a7.17 7.17 0 0 1 6.24 3.58l-1.65-.27a1 1 0 1 0-.32 2l4.25.71h.16a.93.93 0 0 0 .34-.06.33.33 0 0 0 .1-.06.78.78 0 0 0 .2-.11l.08-.1a1.07 1.07 0 0 0 .14-.16.58.58 0 0 0 .05-.16z" />
        <path d="M19.88 14.07a1 1 0 0 0-1.31.56A7.08 7.08 0 0 1 11.93 19a7.17 7.17 0 0 1-6.24-3.58l1.65.27h.16a1 1 0 0 0 .16-2L3.41 13a.91.91 0 0 0-.33 0H3a1.15 1.15 0 0 0-.32.14 1 1 0 0 0-.18.18l-.09.1a.84.84 0 0 0-.07.19.44.44 0 0 0-.07.17l-.75 4a1 1 0 0 0 .8 1.22h.18a1 1 0 0 0 1-.82l.37-2a9.22 9.22 0 0 0 16.58-.83 1 1 0 0 0-.57-1.28z" />
      </BaseIcon.h>
    );
  };

  export const eva_swap: FC<PropsEva> = function icon_eva_swap({ ...rest }) {
    return (
      <BaseIcon.h viewBox="0 0 24 24" {...rest}>
        <rect width="24" height="24" transform="rotate(-90 12 12)" opacity="0" />
        <path d="M4 9h13l-1.6 1.2a1 1 0 0 0-.2 1.4 1 1 0 0 0 .8.4 1 1 0 0 0 .6-.2l4-3a1 1 0 0 0 0-1.59l-3.86-3a1 1 0 0 0-1.23 1.58L17.08 7H4a1 1 0 0 0 0 2z" />
        <path d="M20 16H7l1.6-1.2a1 1 0 0 0-1.2-1.6l-4 3a1 1 0 0 0 0 1.59l3.86 3a1 1 0 0 0 .61.21 1 1 0 0 0 .79-.39 1 1 0 0 0-.17-1.4L6.92 18H20a1 1 0 0 0 0-2z" />
      </BaseIcon.h>
    );
  };

  export const eva_search: FC<PropsEva> = function icon_eva_search({ ...rest }) {
    return (
      <BaseIcon.h viewBox="0 0 24 24" {...rest}>
        <rect width="24" height="24" opacity="0" />
        <path d="M20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6 6 6 0 0 1-6-6z" />
      </BaseIcon.h>
    );
  };

  export const eva_plus: FC<PropsEva> = function icon_eva_search({ ...rest }) {
    return (
      <BaseIcon.h viewBox="0 0 24 24" {...rest}>
        <rect width="24" height="24" transform="rotate(180 12 12)" opacity="0" />
        <path d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z" />
      </BaseIcon.h>
    );
  };

  export const eva_more: FC<PropsEva> = function icon_eva_more({ ...rest }) {
    return (
      <BaseIcon.h viewBox="0 0 24 24" {...rest}>
        <rect width="24" height="24" transform="rotate(-90 12 12)" opacity="0" />
        <circle cx="12" cy="12" r="2" />
        <circle cx="12" cy="5" r="2" />
        <circle cx="12" cy="19" r="2" />
      </BaseIcon.h>
    );
  };
}
