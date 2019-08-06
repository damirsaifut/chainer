import React, { useRef, useState, useEffect, useImperativeHandle } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const Modal = React.forwardRef(({
    children,
    title,
    footer,
    width = 650,
    show = false,
}, ref) => {
    const modal = useRef(null);
    const [visible, setVisibility] = useState(show);
    const [okLoading, setOKLoading] = useState(false);
    const [cancelLoading, setCancelLoading] = useState(false);

    useEffect(() => {
        const evClick = (e) => {
            if (modal && modal.current && visible) {
                if (!modal.current.contains(e.target)) {
                    onHide();
                }
            }
        };

        document.addEventListener("click", evClick);
        return () => {
            document.removeEventListener("click", evClick);
        };
    }, [visible]);

    useEffect(() => {
        let val = "";

        if (document.querySelectorAll(".modal").length) {
            val = "hidden";
        }

        document.body.style.overflow = val;
    }, [visible]);

    function onShow() {
        setVisibility(true);
    }

    function onHide() {
        setVisibility(false);
    }

    async function onHideWithAction(action, loading) {
        loading(true);

        try {
            if (action) {
                await action();
            }

            onHide();
        } catch (e) {
        } finally {
            loading(false);
        }
    }
    async function onWithAction(action, loading) {
        loading(true);

        try {
            if (action) {
                await action();
            }

        } catch (e) {
        } finally {
            loading(false);
        }
    }

    useImperativeHandle(ref, () => ({
        show: onShow,
        hide: onHide,
    }));
    if (visible) {
        return ReactDOM.createPortal((
            <div className="modal modal-mask">
                <div
                    ref={modal}
                    className="modal-window"
                    style={{ width: width }}
                >
                    <div className="modal-window-header">
                        {title && (
                            <h2>{title}</h2>
                        )}

                        <button className="modal__close" onClick={onHide}>
                            <div
                                className="svg"
                                dangerouslySetInnerHTML={{ __html: require('assets/img/close.svg') }}
                            ></div>
                        </button>
                    </div>

                    <div className="modal-window-body">
                        {children}
                    </div>

                    {footer && (
                        <div className="modal-window-footer">
                            {footer.ok && (
                                <button className="modal__button"
                                    onClick={() => onHideWithAction(footer.ok.callback, setOKLoading)}
                                >
                                    {
                                        !okLoading
                                            ? footer.ok.label
                                            : "..."
                                    }
                                </button>
                            )}

                            {footer.cancel && (
                                <button className="modal__button"
                                    onClick={() => onWithAction(footer.cancel.callback, setCancelLoading)}
                                >
                                    {
                                        !cancelLoading
                                            ? footer.cancel.label
                                            : "..."
                                    }
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        ), document.body
        );
    } else {
        return null;
    }
});

Modal.propTypes = {
    // заголовок 
    title: PropTypes.string,
    // если нужны кнопки снизу
    // footer: {
    //     ok: {
    //         label: PropTypes.string,
    //         callback: PropTypes.func
    //     },
    //     cancel: {
    //         label: PropTypes.string,
    //         callback: PropTypes.func
    //     }
    // },
    // ширина модалки в пикселях
    width: PropTypes.number,
    // видимость модалки по умолчанию
    show: PropTypes.bool
};

export default Modal;

//
// пример использования
//
{/*
import React, { useRef } from "react";

const SomeComponent = () => {
    const modalWithCallback = useRef(null);
    const modalWithoutCallback = useRef(null);

    function onOK() {
        console.warn("you pressed OK");
    }

    function onClose() {
        console.warn("you pressed CLOSE");
    }

    return (
        <div>
            <Modal
                ref={modalWithCallback}
                title="Modal with callback buttons"
                footer={{
                    ok: { label: "Окей", callback: onOK },
                    cancel: { label: "Закрыть", callback: onClose }
                }}
            >
                <h1>Hello from modal #1</h1>
            </Modal>
            <button onClick={() => modalWithCallback.current.show()}>Show modal #1</button>

            <Modal
                ref={modalWithoutCallback}
                title="Modal without callback"
            >
                <h1>Hello from modal #2</h1>
            </Modal>
            <button onClick={() => modalWithoutCallback.current.show()}>Show modal #2</button>
        </div>
    );
}
*/}