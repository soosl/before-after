const getTemplate = state => {
    return `
    <div class="before-wrap" style="width: ${state.width}px; background-image: url('${state.before}')">
        <div class="divide-line" data-type="resize"></div>
    </div>
    <div class="after-wrap" style="background-image: url('${state.after}')"></div>
`;
};

class BeforeAfter {
    constructor(selector, state) {
        this.$wrap = document.querySelector(selector);
        this.state = {
            ...state,
            width: state.width || this.$wrap.offsetWidth / 2,
        };

        this.#render(this.state);
        this.#initListener();
    }

    #render = state => {
        this.$wrap.innerHTML = getTemplate(state);
    };

    #update = props => {
        this.state = {
            ...this.state,
            ...props,
        };

        this.#render(this.state);
    };

    #initListener = () => {
        this.$wrap.addEventListener("pointerdown", this.handlePointerDown);
        this.$wrap.addEventListener("pointerup", this.handlePointerUp);
    };

    handlePointerDown = event => {
        if (event.target.getAttribute("data-type") === "resize") {
            this.$wrap.addEventListener("pointermove", this.handlePointerMove);
        }

        this.currentMouseX = event.clientX;
    };

    handlePointerMove = event => {
        const newMouseX = this.currentMouseX - event.clientX;

        this.#update({ width: this.state.width - newMouseX });

        this.currentMouseX = event.clientX;
    };

    handlePointerUp = event => {
        this.$wrap.removeEventListener("pointermove", this.handlePointerMove);
        console.log("up");
    };
}

const slider = new BeforeAfter(".js-before-after", {
    before: "./img/img1.jpg",
    after: "./img/img2.jpg",
});
