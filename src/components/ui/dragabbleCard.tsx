"use client";  // Mark this component as a client-side component

import React from 'react';
import Draggable from 'react-draggable';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Badge } from "@/components/ui/badge"

  import {Button} from "@/components/ui/button"
  import { TaskData } from "./column";



interface DragCardProps {
    data: TaskData;
}

const DragCard: React.FC<DragCardProps> = ({ data }) => {
    return (
        <div>
            <Draggable>
                <Card>
                    <CardHeader>
                        <CardTitle>{data.title}</CardTitle>
                        {/* <CardDescription>Card Description</CardDescription> */}
                    </CardHeader>
                    <CardContent>
                        <p>{data.description}</p>
                    </CardContent>
                    <CardFooter>
                        <Badge variant="outline">{data.priority}</Badge>
                        {/* <Button>Add Task+ </Button> */}
                    </CardFooter>
                </Card>
            </Draggable>
        </div>
    )
}

export default DragCard;
