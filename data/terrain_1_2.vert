#version 140

// Task_1_2 - ToDo Begin

uniform mat4 transform;
uniform sampler2D height;
uniform vec3 a_offset;
uniform float a_time;

in vec3 a_vertex;

out float a_height;

void main()
{
	// Here you need to gather texture coordinates.
	// Tip: note that your terrain might/should be in range [0,1] which
	// accidentally could be interpreted as texture coordinates ...

	// use texture2D function to access a sampler2D object

	// ...
    gl_Position = vec4(a_vertex, 1.0);
    a_height = texture2D(height, gl_Position.xz + a_offset.xy * a_time *50);
    gl_Position.y += a_height + a_offset.y;
    gl_Position = transform * gl_Position;
	// Task_1_2 - ToDo End
}
