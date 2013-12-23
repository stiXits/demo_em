#version 150

// Task_2_3 - ToDo Begin

uniform mat4 fromTheInsideView[6];
uniform mat4 p;
uniform mat4 m_transforms;
//...

layout (triangles) in;
layout (triangle_strip, max_vertices = 18) out;

out vec3 g_eye;
//out int gl_Layer;

void main()
{
	// ToDo: for each cubemap face

	// use the gl_Layer to set the current cube map face to render to

	// retrieve the g_eye vector and pass to fragment stage

	// set  gl_Position, the input is available via
	// gl_in[0].gl_Position to gl_in[2].gl_Position

	// finish up each vertex with EmitVertex();
	// and each primitive with EmitPrimitivie();


    for(int l = 0; l < 6; l++)
    {
        gl_Layer = l;
        for(int i = 0; i < gl_in.length(); i++)
        {
           // g_eye = (pi * gl_in[i].gl_Position * fromTheInsideView[0]).xyz;
            gl_Position = gl_in[i].gl_Position;
            EmitVertex();
        }
        EndPrimitive();
    }
}

// Task_2_3 - ToDo End
