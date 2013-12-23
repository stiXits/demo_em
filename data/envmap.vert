#version 140

// Task_2_1 - ToDo Begin
uniform mat4 pi;
uniform mat4 v;



in vec2 a_vertex;

out vec3 v_eye;

void main()
{
	// ToDo: use the given xy coordinates to retrieve
	// the vertices eye vector (basically the view frustums edges
	// pointing towards +z) that need to be passed to
	// the fragment stage for accessing the various projection
	// mappings.

	v_eye = (pi * vec4(a_vertex, 1.0, 1.0) * v).xyz;

	// Task_2_1 - ToDo End

	// Note: z is already at z = 1.0 (back plane in NDC)

	gl_Position = vec4(a_vertex, 1.0, 1.0);
}
