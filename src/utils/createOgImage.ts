export const createOgImage = ({ title, meta }: { title: string; meta: string }) =>
  [
    // Base
    `https://res.cloudinary.com/dy7kvvzgj/image/upload`,
    // Tamaño general del output
    `w_1600,h_836,q_100`,

    // Imagen logo en esquina superior derecha, por ejemplo
    `l_logo_cgeuzo/fl_layer_apply,g_north_east,x_100,y_100`,

    // Título (ejemplo: “Mi App”)
    `l_text:Ubuntu_92_bold:${e(title)},co_rgb:ffe4e6,c_fit,w_1200,h_400`,
    `fl_layer_apply,g_south_west,x_100,y_340`,

    // Subtítulo / meta info (ejemplo: “Bienvenido a la mejor app”)
    `l_text:Ubuntu_52_bold:${e(meta)},co_rgb:ffe4e680,c_fit,w_1400`,
    `fl_layer_apply,g_south_west,x_100,y_100`,
  ].join('/');

const e = (str: string) => encodeURIComponent(encodeURIComponent(str));
