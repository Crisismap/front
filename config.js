import path from 'path'

const root = __dirname;

const config = {
	root,
	node_modules: path.join(root, 'node_modules'),
	src: path.join(root, 'app'),
	public: path.join(root, 'build')
}

export default config;
