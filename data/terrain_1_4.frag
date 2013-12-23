#version 140

uniform sampler2D water;
uniform float a_time;
uniform sampler2D envmap;
uniform samplerCube source;
uniform samplerCube cubemap;
uniform sampler2D waterheights;
uniform sampler2D waternormals;
uniform int mapping;

in vec3 a_position;
in vec3 v_eye;
in float a_height;


out vec4 fragColor;

const float pi = 3.14159;
float u,v,m;
vec4 f_normal = texture(waternormals, a_position.xz+vec2(a_time)/6);

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
	vec3 n = normalize(f_normal.xyz);
	vec3 e = normalize(v_eye);

	vec3 r = reflect(e, n);

	float frsl = clamp(1.8*pow(dot(e, n), 1.0) - 0.5, 0.0, 1.0);

	vec4 sky = env(r);

	fragColor = texture2D(water, a_position.xz + a_time/10)-vec4(0.3, 0.3, 0.2, 0.0);

	fragColor += sky ;

	fragColor.a = pow(0.20/a_height, 5);
	if(a_height > 0.25)
        fragColor += vec4(0.2);
}


