import IsomorphicRouter from 'isomorphic-relay-router';
import path from 'path';
import React from 'react';
import ReactDOMServer from '../../node_modules/react-dom/server';
import Relay from 'react-relay';
import {match} from 'react-router';
import routes from '../router/routes/routes';

const GRAPHQL_URL = `http://localhost:3000/graphql`;

Relay.injectNetworkLayer(new Relay.DefaultNetworkLayer(GRAPHQL_URL));

export default (req, res, next) => {
    match({routes, location: req.originalUrl}, (error, redirectLocation, renderProps) => {
        if (error) {
            next(error);
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
            IsomorphicRouter.prepareData(renderProps).then(render, next);
        } else {
            res.status(404).send('Not Found');
        }

        function render({data, props}) {
            const reactOutput = ReactDOMServer.renderToString(
                <IsomorphicRouter.RouterContext {...props} />
            );
            res.render(path.resolve(__dirname, '..', '..', 'views', 'index.ejs'), {
                reactOutput
            });
        }
    });
};
