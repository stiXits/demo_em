
#include <vector>
#include <cassert>
#include <qvector.h>
#include <qvector3d.h>
#include <qdebug.h>

#include "OpenGLFunctions.h"

#include "Terrain.h"

using namespace std;

unsigned int Terrain::primitiveRestartIndex = -1;

Terrain::Terrain(
	unsigned short size
,	OpenGLFunctions & gl)
: m_vertices(QOpenGLBuffer::VertexBuffer)
, m_indices(QOpenGLBuffer::IndexBuffer  )
{
    m_size = size;
	m_vao.create();
	m_vao.bind();

	m_vertices.create();
	m_vertices.setUsagePattern(QOpenGLBuffer::StaticDraw);

	m_indices.create();
	m_indices.setUsagePattern(QOpenGLBuffer::StaticDraw);

    // Task_1_1 - ToDo Begin

    strip(size, m_vertices, m_indices, -1);

    // Configure your Vertex Attribute Pointer based on your vertex buffer (mainly number of coefficients ;)).

    gl.glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, sizeof(float)* 0, nullptr);
    gl.glEnableVertexAttribArray(0);

    // Task_1_1 - ToDo End

    m_vao.release();
}

void Terrain::draw(
	OpenGLFunctions & gl
,	const GLenum mode)
{
    // Task_1_1 - ToDo Begin

    // Setup the OpenGL state appropriate to the given and your personal drawing requirements.
    // You might take depth tests, primitive restart, and culling into account.

    gl.glEnable(GL_DEPTH_TEST);
    gl.glEnable(GL_PRIMITIVE_RESTART);
    gl.glPrimitiveRestartIndex(Terrain::primitiveRestartIndex);
    gl.glEnable(GL_CULL_FACE);
    gl.glEnable(GL_TEXTURE_2D);

    m_vao.bind();
    gl.glDrawElements(mode, m_size*m_size*4, GL_UNSIGNED_INT, 0);
    m_vao.release();

    gl.glDisable(GL_DEPTH_TEST);
    gl.glDisable(GL_PRIMITIVE_RESTART);
    gl.glDisable(GL_CULL_FACE);
    gl.glDisable(GL_TEXTURE_2D);

    // Task_1_1 - ToDo End
}

void Terrain::strip(
	const unsigned short size
,	QOpenGLBuffer & vertices
,	QOpenGLBuffer & indices
,	const GLuint primitiveRestartIndex)
{
    QDebug debug = qDebug();
    debug<<"Size: "<<size<<endl;
    // Task_1_1 - ToDo Begin

    // perhaps, check for pointless parameter input

    // tips: probably use some for loops to fill up a std or qt container with
    // floats or other structs, fitting the purpose. further, remember that
    // gradually summing up lots of small floats might lead to major inaccuracies ...

    // the QVectors formatting: row0row1row1.... one rows formatting: ver0ver1ver1
    // this linear formatting delivers a container ready to be buffered

    QVector<QVector3D> *vertexVector = new QVector<QVector3D>();
    QVector<GLuint> *indexVector = new QVector<unsigned int>();
    float factor = 1.0/(size - 1);

    for(int z = 0; z < size; z++)
    {

        for(int x = 0; x < size; x++)
        {
            vertexVector->append(QVector3D(x*factor, 0.0, z*factor));

            if(z != (size - 1))
            {
                //peak
                indexVector->append(z*size + x);

                indexVector->append((z + 1)*size + x);
            }
            else
            {

            }
       }
//      append linebreak to indexVector
        if(z != size-1)
            indexVector->append(Terrain::primitiveRestartIndex);
    }



    if(size <= 2)
    {
        debug<<endl<<"++ Size: "<<vertexVector->size()<<"Vertices: "<<endl;
        for(int v = 0; v < vertexVector->size(); v++)
        {
            debug<<vertexVector->at(v)<<", "<<"\t";
            if(((v+1) % size) == 0)
                debug<<endl;
        }

        debug<<endl<<"++ Size: "<<indexVector->size()<<"Indices: "<<endl;
        for(int v = 0; v < indexVector->size(); v++)
        {
            debug<<indexVector->at(v)<<", ";
            if(indexVector->at(v) == Terrain::primitiveRestartIndex)
                debug<<endl;
        }
    }



	vertices.bind();
	vertices.allocate(vertexVector->constData(), sizeof(QVector3D)*vertexVector->size());


	indices.bind();
	indices.allocate(indexVector->constData(), sizeof(unsigned int)*indexVector->size());

    // Task_1_1 - ToDo End
}
