#version 140

uniform sampler2D ground;
uniform sampler2D caustics;
uniform float a_time;

in float a_height;
in vec3 a_texelPosition;
in vec3 a_normal;

out vec4 fragColor;

// Task_1_3 - ToDo Begin

// Note: you can specify consts instead of uniforms or local variables...
//const float t = 1.0;
vec2 coord;
float offset1;
float offset2;
float mixVal;

float shadow;

void main()
{
	// Implement height based texturing using a texture atlas
	// with known structure ;)

	// Tip: start with getting the height from the vertex stage
	// and think of a function that yields you the two texture "indices".
	// These "indices" can be used as offset when accessing the texture...
	// Tip: again, checkout step, clamp, mod, and smoothstep!

	// ...

	// Note: its ok if you habe minimal seams..., you need not to apply
	// mipmaps not to use safe margins to avoid those seems.

	// ...

	// Note: feel free to scale the textures as it pleases you.

	// ...

	//float i = ... ;
	//fragColor = mix(texture2D(ground, uv0), texture2D(ground, uv1), i);

	if(step(0.25, a_height) == 0)
	{
        offset1 = 0.75;
        mixVal = 0.25 - a_height;
        offset2 = 0.50;
    }
    else if(step(0.50, a_height) == 0)
    {
        offset1 = 0.5;
        mixVal = 0.50 - a_height;
        offset2 = 0.25;
    }
    else if(step(0.75, a_height) == 0)
    {
        offset1 = 0.25;
        mixVal = 0.75 - a_height;
        offset2 = 0.0;
    }
    else
    {
        offset1 = 0.0;
        mixVal = 0.0;
        offset2 = 0.0;
    }

    coord = mod(a_texelPosition.xz/vec2(.4, .1), vec2(0.248, 1.0)) + vec2(0.001, 0.0);
    if(mixVal < 0.1)
    {
        fragColor = mix(texture2D(ground, coord + offset2), texture2D(ground, coord + offset1), mixVal*10);
    }
    else
    {
        fragColor = texture2D(ground, coord + vec2(offset1, 0.0));
    }


    shadow = 0.4 + dot(a_normal, vec3(0.0, 1.0, 0.0));
 //   fragColor.rgb = fragColor.rgb - vec3(shadow)/4 - vec3(0.05);
	// Task_1_3 - ToDo End
	fragColor.rgb -= vec3(clamp(shadow, 0.0, 1.0));

	if(a_height <= 0.21)
    {
        fragColor -= texture2D(caustics, a_texelPosition.xz / vec2(1.0, 0.1) + a_time/5)/5;
    }


}


