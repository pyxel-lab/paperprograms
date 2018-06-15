import './entry';
import Paper from './paper';

(function(workerContext) {
  const paper = workerContext.paper;

  workerContext.world = {
    async get(command, options) {
      switch (command) {
        case 'supporterCanvas':
          return paper.get('supporterCanvas', options);

        case 'paper': {
          const number = await paper.get('number');
          return new Paper({ number, api: paper, isOwnPaper: true });
        }

        case 'globalState': {
          return paper.get('papers');
        }

        case 'papers': {
          const papers = await paper.get('papers');
          return Object.keys(papers).map(number => new Paper({ number, api: paper }));
        }

        case 'markers': {
          return paper.get('markers');
        }

        default:
          throw new Error(`world.get: unknown command "${command}"`);
      }
    },
  };

  workerContext.paper = undefined;
})(self);
