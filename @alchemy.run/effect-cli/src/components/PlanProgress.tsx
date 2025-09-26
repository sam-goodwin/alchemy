// biome-ignore lint/style/useImportType: UMD global
import React, { useEffect, useMemo, useRef, useState } from "react";

import type * as Alchemy from "@alchemy.run/effect";
import { Box, Text } from "ink";
import type { ProgressEventSource } from "../progress.tsx";
import { useGlobalSpinner } from "../spinner.ts";

interface PlanTask
  extends Required<Pick<Alchemy.ApplyEvent, "id" | "type" | "status">> {
  message?: string;
  updatedAt: number;
}

export interface PlanProgressProps {
  source: ProgressEventSource;
  plan: Alchemy.AnyPlan;
}

export function PlanProgress(props: PlanProgressProps): React.JSX.Element {
  const { source, plan } = props;
  const spinner = useGlobalSpinner();
  const [tasks, setTasks] = useState<Map<string, PlanTask>>(() => {
    // Initialize tasks from the plan with appropriate starting status
    const initialTasks = new Map<string, PlanTask>();
    for (const [id, planItem] of Object.entries(plan)) {
      const status: Alchemy.ApplyStatus =
        planItem.action === "noop" ? "success" : "pending";
      initialTasks.set(id, {
        id,
        type: planItem.resource.type,
        status,
        updatedAt: Date.now(),
      });
    }
    return initialTasks;
  });

  const unsubscribeRef = useRef<null | (() => void)>(null);

  useEffect(() => {
    unsubscribeRef.current?.();
    unsubscribeRef.current = source.subscribe((event) => {
      setTasks((prev) => {
        const next = new Map(prev);
        const current = next.get(event.id);

        // Only handle resource-level events, ignore binding events
        if (!event.bindingId) {
          const updated: PlanTask = {
            id: event.id,
            type: event.type,
            status: event.status,
            message: event.message ?? current?.message,
            updatedAt: Date.now(),
          };
          next.set(event.id, updated);
        }

        return next;
      });
    });
    return () => {
      unsubscribeRef.current?.();
      unsubscribeRef.current = null;
    };
  }, [source]);

  // Reinitialize tasks when plan changes
  useEffect(() => {
    setTasks(() => {
      const initialTasks = new Map<string, PlanTask>();
      for (const [id, planItem] of Object.entries(plan)) {
        const status: Alchemy.ApplyStatus =
          planItem.action === "noop" ? "success" : "pending";
        initialTasks.set(id, {
          id,
          type: planItem.resource.type,
          status,
          updatedAt: Date.now(),
        });
      }
      return initialTasks;
    });
  }, [plan]);

  const rows = useMemo(
    () =>
      Array.from(tasks.values()).sort((a, b) => {
        // First sort by status priority
        const priorityDiff =
          statusPriority(a.status) - statusPriority(b.status);
        if (priorityDiff !== 0) return priorityDiff;

        // Then sort by ID for consistent ordering within same priority
        return a.id.localeCompare(b.id);
      }),
    [tasks],
  );

  return (
    <Box flexDirection="column">
      {rows.map((task) => {
        const color = statusColor(task.status);
        const icon = statusIcon(task.status, spinner);

        return (
          <Box key={task.id} flexDirection="row">
            <Box width={2}>
              <Text color={color}>{icon} </Text>
            </Box>
            <Box width={12}>
              <Text bold>{task.id}</Text>
            </Box>
            <Box width={25}>
              <Text dimColor>({task.type})</Text>
            </Box>
            <Box width={12}>
              <Text color={color}>{task.status}</Text>
            </Box>
            <Box>
              {task.message ? <Text dimColor>• {task.message}</Text> : null}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

function statusPriority(status: Alchemy.ApplyStatus): number {
  switch (status) {
    case "success":
    case "created":
    case "updated":
    case "deleted":
      return 0; // highest priority (success)
    case "fail":
      return 1;
    case "creating":
    case "updating":
    case "deleting":
      return 2; // in progress
    case "pending":
      return 3; // lowest priority (pending)
    default:
      return 4;
  }
}

function statusColor(
  status: Alchemy.ApplyStatus,
): Parameters<typeof Text>[0]["color"] {
  switch (status) {
    case "pending":
      return "gray";
    case "creating":
    case "created":
      return "green";
    case "updating":
    case "updated":
      return "yellow";
    case "deleting":
    case "deleted":
      return "red";
    case "success":
      return "green";
    case "fail":
      return "redBright";
    default:
      return undefined;
  }
}

function statusIcon(status: Alchemy.ApplyStatus, spinnerChar: string): string {
  if (isInProgress(status)) return spinnerChar;
  if (status === "fail") return "✗";
  return "✓"; // created/updated/deleted/success
}

function isInProgress(status: Alchemy.ApplyStatus): boolean {
  return (
    status === "pending" ||
    status === "creating" ||
    status === "updating" ||
    status === "deleting"
  );
}
