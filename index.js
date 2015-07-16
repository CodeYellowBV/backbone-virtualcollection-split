(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['backbone', 'underscore', 'backbone-virtual-collection'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('backbone'), require('underscore'), require('backbone-virtual-collection'));
  } else {
    root.SplitCollection = factory(root.Backbone, root._, root.VirtualCollection);
  }
}(this, function(Backbone, _, VirtualCollection) {
    return function(collection, key) {
        var MSplit = Backbone.Model.extend({
            initialize: function () {
                this.listenTo(this.get('collection'), 'remove reset', function () {
                    if (this.get('collection').length === 0) {
                        this.collection.remove(this);
                    }
                }.bind(this));
            }
        }),
        cSplit = new Backbone.Collection(null, {
            model: MSplit
        }),
        cVirtualCollectionTemp = new VirtualCollection(collection, {
            filter: function (model) {
                var splitBy = model.get(key),
                    collection = this.collection;

                if (!cSplit.get(splitBy)) {
                    cSplit.add({
                        id: splitBy,
                        collection: new VirtualCollection(collection, {
                            filter: function (model) {
                                return model.get(key) === splitBy;
                            }
                        })
                    });
                }
                return false;
            }
        });

        return cSplit;
    };
}));
