declare module 'postprocessing' {
    import { WebGLRenderer, Scene, Camera, Texture } from 'three';

    export class EffectComposer {
        constructor(renderer: WebGLRenderer);
        addPass(pass: Pass): void;
        render(deltaTime?: number): void;
        setSize(width: number, height: number): void;
    }

    export class Pass {
        enabled: boolean;
    }

    export class RenderPass extends Pass {
        constructor(scene: Scene, camera: Camera);
    }

    export class EffectPass extends Pass {
        constructor(camera: Camera, ...effects: Effect[]);
    }

    export class Effect {
        constructor(name: string, fragmentShader: string, options?: any);
        uniforms: Map<string, { value: any }>;
    }
}
