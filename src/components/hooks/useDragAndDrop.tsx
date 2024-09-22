//this is a custom hook for drag and drop functionality in kanban board

import {useState} from 'react';
import { TaskData } from '@/components/ui/column';
import {DragDropContext, Draggable, Droppable,  DroppableProvided} from 'react-beautiful-dnd';

interface DragCardProps {
    data: TaskData[];
    onDragEnd: (result: any) => void;
}

export const useDragAndDrop = ({data, onDragEnd}: DragCardProps) => {
    const [draggedData, setDraggedData] = useState<TaskData[]>(data);

    const handleOnDragEnd = (result: any) => {
        if(!result.destination) return;
        const updatedData = Array.from(draggedData);
        const [reorderedItem] = updatedData.splice(result.source.index, 1);
        updatedData.splice(result.destination.index, 0, reorderedItem);
        setDraggedData(updatedData);
        onDragEnd(updatedData);
    }

    const DragDropProvider = ({children}:{children: React.ReactNode}) => (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            {children}
        </DragDropContext>
    )
    const DropArea = ({ children, droppableId }: { children: React.ReactNode, droppableId: string }) => (
        <Droppable droppableId={droppableId}>
            {(provided: DroppableProvided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                    {children}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
    

    const DragItem: React.FC<{ data: TaskData; index: number; children: React.ReactNode }> = ({ data, index, children }) => (
            <Draggable draggableId={data._id} index={index}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    {data.title}
                </div>
            )}
        </Draggable>
    )

    return{
        draggedData,
        DragDropProvider,
        DragItem,
        DropArea,

    }
}
