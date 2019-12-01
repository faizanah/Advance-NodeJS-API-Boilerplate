import fs from 'fs';
// import path from 'path';
import SwaggerJSDoc from 'swagger-jsdoc';
import AppSetting from './app.setting';

// let packageJson;
// (async () => {
//   packageJson = await import(path.join(process.cwd(), 'package.json'));
// })();

export default class ApiDoc {
  static get definition() {
    return {
      openapi: '3.0.0',
      info: ApiDoc.info,
      schemes: ['http', 'https'],
      consumes: ['application/json'],
      produces: ['application/json'],
      components: {}
    };
  }

  static get info() {
    return {
      title: AppSetting.getConfig().APP.NAME,
      // version: packageJson.version,
      // description: packageJson.description,
      'x-logo': {
        url:
          'https://www.aiondigital.com/wp-content/uploads/2018/07/Aion_white-1024x241.png',
        altText: AppSetting.getConfig().APP.NAME
      },
      contact: {
        name: 'AION SUPPORT',
        url: 'https://www.aiondigital.com/support',
        email: 'faizan@aiondigital.com'
      },
      host: `http://localhost:${AppSetting.getConfig().APP.PORT}`,
      basePath: AppSetting.getConfig().APP.BASE_PATH
    };
  }

  static publish(app) {
    fs.writeFileSync('public/api.docs.json', ApiDoc.fileContent);
    app.get('/docs', (req, res) => {
      res.sendFile('index.html');
    });
  }

  static get fileContent() {
    const content = SwaggerJSDoc({
      swaggerDefinition: ApiDoc.definition,
      apis: ['./docs/**/*.yaml']
    });
    return JSON.stringify(content, null, 2);
  }
}
