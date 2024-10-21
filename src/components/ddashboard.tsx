"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  MoreVertical,
  Package,
  Search,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type MenuItem = {
  id: string;
  name: string;
  price: number;
};

type OrderItem = {
  id: string;
  menuItemId: string;
  quantity: number;
  price: number;
  menuItem: MenuItem;
};

type DeliveryOrder = {
  id: string;
  name: string;
  status: string;
  address: string;
  phoneNumber: string;
  totalAmount: number;
  estimatedDeliveryTime: string | null;
  createdAt: string;
  updatedAt: string;
  orderItems: OrderItem[];
};

export const DeliveryDashboardContent = ({
  initialOrders,
  restaurantId,
}: {
  initialOrders: DeliveryOrder[];
  restaurantId: string;
}) => {
  const [orders, setOrders] = useState<DeliveryOrder[]>(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<DeliveryOrder | null>(
    initialOrders[0] || null
  );

  const updateOrders = useCallback(
    (updatedOrder: DeliveryOrder) => {
      setOrders((prevOrders) => {
        const updatedOrders = prevOrders.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        );
        return updatedOrders;
      });
      if (selectedOrder && selectedOrder.id === updatedOrder.id) {
        setSelectedOrder(updatedOrder);
      }
    },
    [selectedOrder]
  );

  const handleStatusChange = async (
    orderId: string,
    newStatus: "CONFIRMED" | "IN_PREPARATION" | "OUT_FOR_DELIVERY" | "DELIVERED" | "CANCELLED"
  ) => {
    try {
      const response = await fetch(`/api/deliveryorders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedOrder = await response.json();
      updateOrders(updatedOrder);
      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Failed to update order status. Please try again.");
    }
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const statusColors: Record<string, string> = {
      PENDING: "bg-yellow-200 text-yellow-800",
      CONFIRMED: "bg-blue-200 text-blue-800",
      IN_PREPARATION: "bg-orange-200 text-orange-800",
      OUT_FOR_DELIVERY: "bg-purple-200 text-purple-800",
      DELIVERED: "bg-green-200 text-green-800",
      CANCELLED: "bg-red-200 text-red-800",
    };

    return (
      <Badge className={`${statusColors[status]} rounded-full px-2 py-1 text-xs font-semibold`}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Delivery Orders</CardTitle>
          <CardDescription>Manage your restaurant's delivery orders</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} onClick={() => setSelectedOrder(order)}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.name}</TableCell>
                  <TableCell>
                    <StatusBadge status={order.status} />
                  </TableCell>
                  <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onSelect={() => handleStatusChange(order.id, "CONFIRMED")}>
                          Confirm Order
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleStatusChange(order.id, "IN_PREPARATION")}>
                          Start Preparation
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleStatusChange(order.id, "OUT_FOR_DELIVERY")}>
                          Out for Delivery
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleStatusChange(order.id, "DELIVERED")}>
                          Mark as Delivered
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onSelect={() => handleStatusChange(order.id, "CANCELLED")}>
                          Cancel Order
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
          <CardDescription>
            {selectedOrder ? `Order #${selectedOrder.id}` : "Select an order to view details"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {selectedOrder && (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Customer Information</h4>
                <p>Name: {selectedOrder.name}</p>
                <p>Phone: {selectedOrder.phoneNumber}</p>
                <p>Address: {selectedOrder.address}</p>
              </div>
              <div>
                <h4 className="font-semibold">Order Items</h4>
                <ul className="list-inside list-disc">
                  {selectedOrder.orderItems.map((item) => (
                    <li key={item.id}>
                      {item.menuItem.name} x {item.quantity} - ${item.price.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">Total Amount</h4>
                <p>${selectedOrder.totalAmount.toFixed(2)}</p>
              </div>
              <div>
                <h4 className="font-semibold">Status</h4>
                <StatusBadge status={selectedOrder.status} />
              </div>
              {selectedOrder.estimatedDeliveryTime && (
                <div>
                  <h4 className="font-semibold">Estimated Delivery Time</h4>
                  <p>{format(new Date(selectedOrder.estimatedDeliveryTime), "PPpp")}</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DeliveryDashboardContent;