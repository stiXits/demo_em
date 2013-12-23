#version 150

// Task_2_3 - ToDo Begin

uniform mat4 fromTheInsideView[6];
uniform mat4 p;
uniform mat4 m_transforms;
uniform mat4 transform;
//...

layout (triangles) in;
layout (triangle_strip, max_vertices = 18) out;

in float a_height[];
in vec3 a_texelPosition[];
in vec3 a_normal[];

out float g_height;
out vec3 g_texelPosition;
out vec3 g_normal;

out int gl_Layer;

void main()
{
	// ToDo: for each cubemap face

	// use the gl_Layer to set the current cube map face to render to

	// retrieve the g_eye vector and pass to fragment stage

	// set  gl_Position, the input is available via
	// gl_in[0].gl_Position to gl_in[2].gl_Position

	// finish up each vertex with EmitVertex();
	// and each primitive with EmitPrimitivie();

	g_height = a_height[0];
	g_texelPosition = a_texelPosition[0];
	g_normal = a_normal[0];

    for(int l = 0; l < 6; l++)
    {
        gl_Layer = l;
        for(int i = 0; i < gl_in.length(); i++)
        {
            gl_Position = (p * fromTheInsideView[l]) * m_transforms * gl_in[i].gl_Position;
            EmitVertex();
        }
        EndPrimitive();
    }

}

// Task_2_3 - ToDo End

