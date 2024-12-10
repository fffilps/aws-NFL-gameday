import { ContentLayout, Header, Link } from "@cloudscape-design/components";
import React, { useState } from "react";

import Board from "@cloudscape-design/board-components/board";
import BoardItem from "@cloudscape-design/board-components/board-item";

import { BoardItemsType } from "../../types";
import Players from "../BoardItems/Task1/Players";
import EmbeddedUi from "../BoardItems/Task2/EmbeddedUi";

const MainContent = (): React.ReactNode => {
  const [items, setItems] = useState<BoardItemsType[]>([
    {
      id: "1",
      rowSpan: 6,
      columnSpan: 4,
      data: { title: "Task 1", content: <Players /> },
    },
    {
      id: "2",
      rowSpan: 6,
      columnSpan: 4,
      data: { title: "Task 2", content: <EmbeddedUi /> },
    }
  ]);
  return (
    <ContentLayout
      header={
        <Header variant="h1">
          NFL Challenge
        </Header>
      }
    >
      <Board
        renderItem={(item) => (
          <BoardItem
            header={<Header>{item.data.title}</Header>}
            i18nStrings={{
              dragHandleAriaLabel: "Drag handle",
              dragHandleAriaDescription:
                "Use Space or Enter to activate drag, arrow keys to move, Space or Enter to submit, or Escape to discard.",
              resizeHandleAriaLabel: "Resize handle",
              resizeHandleAriaDescription:
                "Use Space or Enter to activate resize, arrow keys to move, Space or Enter to submit, or Escape to discard.",
            }}
          >
            {item.data.content}
          </BoardItem>
        )}
        onItemsChange={(event: any) => setItems(event.detail.items)}
        items={items}
        i18nStrings={(() => {
          function createAnnouncement(
            operationAnnouncement: any,
            conflicts: any,
            disturbed: any
          ) {
            const conflictsAnnouncement =
              conflicts.length > 0
                ? `Conflicts with ${conflicts
                    .map((c: any) => c.data.title)
                    .join(", ")}.`
                : "";
            const disturbedAnnouncement =
              disturbed.length > 0
                ? `Disturbed ${disturbed.length} items.`
                : "";
            return [
              operationAnnouncement,
              conflictsAnnouncement,
              disturbedAnnouncement,
            ]
              .filter(Boolean)
              .join(" ");
          }
          return {
            liveAnnouncementDndStarted: (operationType: any) =>
              operationType === "resize" ? "Resizing" : "Dragging",
            liveAnnouncementDndItemReordered: (operation: any) => {
              const columns = `column ${operation.placement.x + 1}`;
              const rows = `row ${operation.placement.y + 1}`;
              return createAnnouncement(
                `Item moved to ${
                  operation.direction === "horizontal" ? columns : rows
                }.`,
                operation.conflicts,
                operation.disturbed
              );
            },
            liveAnnouncementDndItemResized: (operation: any) => {
              const columnsConstraint = operation.isMinimalColumnsReached
                ? " (minimal)"
                : "";
              const rowsConstraint = operation.isMinimalRowsReached
                ? " (minimal)"
                : "";
              const sizeAnnouncement =
                operation.direction === "horizontal"
                  ? `columns ${operation.placement.width}${columnsConstraint}`
                  : `rows ${operation.placement.height}${rowsConstraint}`;
              return createAnnouncement(
                `Item resized to ${sizeAnnouncement}.`,
                operation.conflicts,
                operation.disturbed
              );
            },
            liveAnnouncementDndItemInserted: (operation: any) => {
              const columns = `column ${operation.placement.x + 1}`;
              const rows = `row ${operation.placement.y + 1}`;
              return createAnnouncement(
                `Item inserted to ${columns}, ${rows}.`,
                operation.conflicts,
                operation.disturbed
              );
            },
            liveAnnouncementDndCommitted: (operationType: any) =>
              `${operationType} committed`,
            liveAnnouncementDndDiscarded: (operationType: any) =>
              `${operationType} discarded`,
            liveAnnouncementItemRemoved: (op: any) =>
              createAnnouncement(
                `Removed item ${op.item.data.title}.`,
                [],
                op.disturbed
              ),
            navigationAriaLabel: "Board navigation",
            navigationAriaDescription:
              "Click on non-empty item to move focus over",
            navigationItemAriaLabel: (item: any) =>
              item ? item.data.title : "Empty",
          };
        })()}
      />
    </ContentLayout>
  );
};

export default MainContent;
