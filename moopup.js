var Moopup = new Class({
    Implements: [ Options ],
    
    options: {
        backgroundColor: '#333132',
        color: '#fff67c',
        borderTopColor: '#282728',
        animate: true
    },
    
    initialize: function(options) {
        this.setOptions(options);
        
        var req = new Request.JSON({
            url: 'http://api.icndb.com/jokes/random',
            onSuccess: this.showJoke.bind(this)
        });
        delete req.headers['X-Requested-With']; // api.icndb doesn't have the right Access-Control-Allow-Headers :(
        delete req.headers['X-Request'];
        req.send();
    },
    
    showJoke: function(joke) {
        var mopup = new Element('div', {
            id: 'mopup',
            html: joke.value.joke
        }).setStyles({
            position: 'fixed',
            right: 0,
            backgroundColor: this.options.backgroundColor,
            color: this.options.color,
            padding: '1em',
            maxWidth: 400,
            borderTop: '4px solid '+this.options.borderColor
        }).inject($(document.body));
        
        if (this.options.animate) {
            mopup.setStyle('bottom', -mopup.getSize().y);
            mopup.tween('bottom', 0);
        } else {
            mopup.setStyle('bottom', 0);
        }
    }

});