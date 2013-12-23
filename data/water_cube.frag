#version 140

uniform sampler2D water;
uniform float a_time;

in vec3 g_position;


out vec4 fragColor;


void main()
{
	fragColor = texture(water, g_position.xz + a_time/10);
	fragColor.a = 0.5;

}


