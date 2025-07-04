import { Panel } from "@xyflow/react"
import Image from "next/image"
import { panelToolsTop } from "@/constant/panelToolsTop"
import { Button } from "@heroui/button"
import { Tooltip } from "@heroui/tooltip"
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react"
import { useState } from "react"
import { erdExport } from "@/constant/erdExport"
import { DBExportType } from "@/types/type"
import { initialNodes } from "@/constant/initialNodes"
import {
  DatabaseExportService,
  FileDownloadService,
} from "@/utils/exportToDatabase"

export default function CustomTopPanel() {
  const [openModal, setOpenModal] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [currentExportType, setCurrentExportType] =
    useState<DBExportType | null>(null)

  const onHandleExport = async (exportType: DBExportType) => {
    setIsExporting(true)
    setCurrentExportType(exportType)
    try {
      const exportResult = DatabaseExportService.exportToDatabase(
        initialNodes,
        exportType
      )

      // Download the file using the new service
      FileDownloadService.downloadExportResult(exportResult)

      // Close the modal after successful export
      setOpenModal(false)

      console.log(`Successfully exported to ${exportType}`)
    } catch (err) {
      console.error("Error exporting ERD:", err)
      // You might want to show a toast notification here
      alert(
        `Error exporting to ${exportType}: ${err instanceof Error ? err.message : "Unknown error"}`
      )
    } finally {
      setIsExporting(false)
      setCurrentExportType(null)
    }
  }
  return (
    <Panel
      position="top-right"
      className="bg-opacity-90 relative flex items-center justify-evenly gap-1 rounded-sm border border-gray-100 bg-white p-1 shadow-sm backdrop-blur-sm"
    >
      {panelToolsTop.map((tool, index) => {
        return (
          <Tooltip
            key={index}
            content={tool.tooltip}
            showArrow={true}
            placement="bottom"
            color="foreground"
          >
            <Button
              onPress={() => setOpenModal(true)}
              variant="light"
              color="default"
              size="sm"
              isIconOnly
              className="h-9 w-9"
            >
              <Image src={tool.icon} alt={tool.name} height={20} width={20} />
            </Button>
          </Tooltip>
        )
      })}
      <Modal isOpen={openModal} onClose={() => setOpenModal(!openModal)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Export As
              </ModalHeader>
              <ModalBody>
                {erdExport.map((exportType, index) => (
                  <Button
                    variant="faded"
                    key={index}
                    onPress={onHandleExport.bind(null, exportType)}
                    isDisabled={isExporting}
                    isLoading={isExporting && currentExportType === exportType}
                  >
                    {exportType}
                  </Button>
                ))}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Panel>
  )
}
