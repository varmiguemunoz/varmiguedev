export const createOgImage = ({ title, meta }: { title: string; meta: string }) =>
  [
    // Base Cloudinary URL
    `https://res.cloudinary.com/dy7kvvzgj/image/upload`,

    // Logo
    `jeouwa5trszwteqwlhfe_l4dwdy`,
    // Tamaño optimizado para OG (1200x630 es el estándar)
    `w_1200,h_630,q_90`,

    // Logo en esquina superior derecha
    `ni8reifydcj1456wvspu_hj0p4j/fl_layer_apply,g_north_east,x_80,y_80,w_120`,

    // Título dinámico (ajustado para mejor legibilidad)
    `l_text:Ubuntu_72_bold:${e(title)},co_rgb:ffe4e6,c_fit,w_1000,h_320`,
    `fl_layer_apply,g_south_west,x_80,y_280`,

    // Subtítulo / meta info
    `l_text:Ubuntu_42:${e(meta)},co_rgb:ffe4e680,c_fit,w_1000,h_200`,
    `fl_layer_apply,g_south_west,x_80,y_80`,

    `e_brightness:-20,e_contrast:20`,
  ].join('/');

const e = (str: string) => encodeURIComponent(encodeURIComponent(str));
