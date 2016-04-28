function cancelScrollEvent(e) {
    e.stopImmediatePropagation();
    e.preventDefault();
    e.returnValue = false;
    return false;
}

function addScrollEventListener(elem, handler) {
    elem.addEventListener('wheel', handler, false);
}

function removeScrollEventListener(elem, handler) {
    elem.removeEventListener('wheel', handler, false);
}

var onScrollHandlerBound

var scrollLock = {

    scrollLock(elem) {
        if (elem) {
          onScrollHandlerBound = this.onScrollHandler.bind(null, elem)
            addScrollEventListener(elem, onScrollHandlerBound);
        }
    },

    scrollRelease(elem) {
        if (elem) {
            removeScrollEventListener(elem, onScrollHandlerBound);
        }
    },

    onScrollHandler(elem, e) {
        var scrollTop = elem.scrollTop;
        var scrollHeight = elem.scrollHeight;
        var height = elem.clientHeight;
        var wheelDelta = e.deltaY;
        var isDeltaPositive = wheelDelta > 0;

        if (isDeltaPositive && wheelDelta > scrollHeight - height - scrollTop) {
            elem.scrollTop = scrollHeight;
            return cancelScrollEvent(e);
        }
        else if (!isDeltaPositive && -wheelDelta > scrollTop) {
            elem.scrollTop = 0;
            return cancelScrollEvent(e);
        }
    }
}

export default scrollLock
