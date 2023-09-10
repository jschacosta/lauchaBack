import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const staticDir = path.join(__dirname, '../public'); //'public' ruta de tus archivos estáticos

export default staticDir;