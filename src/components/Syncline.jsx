import React, { Component } from "react";
import { withTranslation } from 'react-i18next';

const CANVAS = {
    offset: 8,
    height: 48,
}

class Syncline extends Component {
    componentDidMount() {
        setTimeout(() => {
            window.addEventListener("resize", this.resize);

            this.resize();
            this.draw();
        }, 0);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resize);
    }

    resize = () => {
        this.canvas.width = this.syncline.clientWidth;
        this.canvas.height = CANVAS.height;
        this.draw();
    }

    draw = () => {
        const { fence, max, blocks, colors } = this.props;
        const { scrollWidth } = this.syncline;
        const { height, offset } = CANVAS;
        const lineHeight = height - (offset * 2);

        const ctx = this.canvas.getContext("2d");
        ctx.clearRect(0, 0, max, this.canvas.clientHeight);

        ctx.fillStyle = colors.pending;
        ctx.fillRect(0, offset, max, lineHeight);

        blocks.forEach((el, i) => {
            const start = Math.floor((el[0] / max) * scrollWidth);
            const end = Math.floor((el[1] / max) * scrollWidth);
            var width = end - start;

            if (width < 1)
                width = 1;

            // draw synced blocks
            ctx.fillStyle = colors.synced;
            ctx.fillRect(start, offset, width, lineHeight);

            // draw start flank
            ctx.fillStyle = colors.flank;
            ctx.fillRect(start, offset, 1, lineHeight);

            // draw end flank
            ctx.fillStyle = colors.flank;
            ctx.fillRect(end - 1, offset, 1, lineHeight);
        });

        if (fence && fence > 0) {
            const start = Math.floor((fence / max) * scrollWidth);

            ctx.fillStyle = colors.fence;
            ctx.fillRect(start, 0, 1, height);
        }
    }

    render() {
        const { fence, colors, t } = this.props;

        return (
            <div
                ref={(node) => this.syncline = node}
                className="syncline"
            >
                <div className="syncmap">
                    <ul>
                        <li>
                            <div
                                className="syncmap-color"
                                style={{ backgroundColor: colors.pending }}
                            ></div>
                            <span>{t('s-pending')}</span>
                        </li>
                        {
                            fence && fence > 0 && (
                                <li>
                                    <div
                                        className="syncmap-color"
                                        style={{ backgroundColor: colors.fence }}
                                    ></div>
                                    <span>{t('s-fence')}</span>
                                </li>
                            )
                        }
                        <li>
                            <div
                                className="syncmap-color"
                                style={{ backgroundColor: colors.synced }}
                            ></div>
                            <span>{t('s-sync')}</span>
                        </li>
                        <li>
                            <div
                                className="syncmap-color"
                                style={{ backgroundColor: colors.flank }}
                            ></div>
                            <span>{t('s-last')}</span>
                        </li>
                    </ul>
                </div>

                <canvas
                    height={CANVAS.height}
                    ref={(node) => this.canvas = node}
                    className="syncarea"
                ></canvas>
            </div>
        );
    }
};

Syncline.defaultProps = {
    colors: {
        fence: "#1e90ff",
        flank: "#2ed573",
        synced: "#7bed9f",
        pending: "#f1f2f6",
    }
};

export default withTranslation()(Syncline);