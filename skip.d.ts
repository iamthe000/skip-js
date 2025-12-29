declare namespace Skip {
    type Helper = {
        print: (html: string) => void;
        sleep: (ms: number) => Promise<void>;
        $: (selector: string) => Element | null;
        $$: (selector: string) => NodeListOf<Element>;
    };

    type Config = {
        targetId?: string;
        lang?: string;
        title?: string;
        charset?: string;
        viewport?: string;
        themeColor?: string;
        autoClear?: boolean;
        run?: (helpers: Helper) => Promise<void>;
    };

    function start(config: Config): Promise<void>;
}
