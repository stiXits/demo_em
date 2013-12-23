#version 140

uniform sampler2D envmap;
uniform samplerCube source;
uniform samplerCube cubemap;
uniform float timef;

out vec4 fragColor;
uniform int mapping;

in vec3 v_normal;
in vec3 v_eye;

// Task_2_3 - ToDo Begin
// Copy your env function from 2_1
const float pi = 3.14159;
float u,v,m;

vec4 terrain(in vec3 eye)
{
	vec4 color;

    color = texture(source, eye);
	return color;
}

vec4 env(in vec3 eye)
{
	vec4 color;


	if(0 == mapping) 		// cube
	{
		// use texture function with the cubemap sampler
		color = texture(cubemap, eye);
	}
	else if(1 == mapping) 	// polar
	{

        u = 0.5*atan(eye.x, eye.z)/pi;
        v = 2.0*asin(-eye.y)/pi;

        color = texture(envmap, vec2(u, v));
        color = mix(vec4(0.1, 0.1, 0.11, 0.1), color, smoothstep(0.0,0.03, eye.y));
 	}
	else if(2 == mapping) 	// paraboloid
	{
		// use texture function with the envmap sampler
		m = 2.0 + 2.0 * eye.y;
        u = 0.5 + eye.x/m;
        v = 0.5 + eye.z/m;

        color = texture(envmap, vec2(u, v));
        color = mix(vec4(0.0, 0.0, 0.0, 0.0), color, smoothstep(0.0,0.03, eye.y));
	}
	else if(3 == mapping) 	// sphere
	{
		// use texture function with the envmap sampler
		m = 2.0*sqrt(pow(eye.x, 2) + pow(eye.y, 2) + pow(1.0 - eye.z, 2));
		u = 0.5 - eye.x/m;
		v = 0.5 - eye.y/m;

        color = texture(envmap, vec2(u, v));
	}
	return color;
}

void main()
{
	vec3 n = normalize(v_normal);
	vec3 e = normalize(v_eye);

	vec3 r = reflect(e, -n);

	vec4 refl = terrain(r);
    if(refl == vec4(1.0, 1.0, 1.0, 1.0))
    {
        r = reflect(-e, -n);
        refl = env(r);
    }

    fragColor = refl;

}

// Task_2_3 - ToDo End
