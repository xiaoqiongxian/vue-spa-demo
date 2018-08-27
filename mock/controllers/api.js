const lists = require('../lists');

const APIError = require('../rest').APIError;

module.exports = {
    'GET /api/lists': async (ctx, next) => {
        ctx.rest({
            code:"success",
            data: lists.getLists()
        });
    },

    'POST /api/lists': async (ctx, next) => {
        var item = lists.createList(ctx.request.body.name, ctx.request.body.status);
        if (item) {
            ctx.rest({
                code:"success",
                data: null
            });
        } else {
            throw new APIError('product:update_fail', 'update fail.');
        }
    },

    'PUT /api/lists/:id': async (ctx, next) => {
        var item = lists.updateList(ctx.params.id, ctx.request.body.name, ctx.request.body.status);
        if (item) {
            ctx.rest({
                code:"success",
                data: null
            });
        } else {
            throw new APIError('product:update_fail', 'update fail.');
        }
    },

    'DELETE /api/lists/:id': async (ctx, next) => {
        console.log(`delete product ${ctx.params.id}...`);
        var item = lists.deleteList(ctx.params.id);
        if (item) {
            ctx.rest({
                code:"success",
                data: ctx.params.id
            });
        } else {
            throw new APIError('product:not_found', 'product not found by id.');
        }
    }
};
