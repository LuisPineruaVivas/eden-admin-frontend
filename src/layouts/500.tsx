import { Button } from "@components/ui/Button"
import { useTranslation } from "react-i18next"
import { Alert, AlertDescription } from "@components/ui/Alert"
import { AlertTriangle, Home, RefreshCw, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@components/ui/Card"



export default function Error500() {
  const handleRefresh = () => {
    window.location.reload()
  }

  const handleGoHome = () => {
    window.location.href = "/"
  }

  const handleGoBack = () => {
    window.location.href = "/"
  }

  const { t } = useTranslation("common")

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>
          <CardTitle className="text-3xl font-bold text-foreground mb-2">{t("translation.layoutsError.error500.title")}</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">{t("translation.layoutsError.error500.subtitle")}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Alert className="border-destructive/20 bg-destructive/5">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <AlertDescription className="text-destructive">{t("translation.layoutsError.error500.description")}</AlertDescription>
          </Alert>

          <div className="text-center text-sm text-muted-foreground space-y-1">
            <p>
              {t("translation.layoutsError.error500.errorcode")}: <span className="font-mono font-semibold">500</span>
            </p>
            <p>
              {t("translation.layoutsError.error500.time")}: <span className="font-mono">{new Date().toLocaleString()}</span>
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-2 pt-4">
          <Button
            onClick={handleRefresh}
            className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            size="lg"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            {t("translation.layoutsError.error500.buttontryagain")}
          </Button>

          <div className="flex space-x-2 w-full">
            <Button onClick={handleGoBack} variant="outline" className="flex-1 bg-background">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("translation.layoutsError.error500.buttonback")}
            </Button>

            <Button onClick={handleGoHome} variant="outline" className="flex-1 bg-background">
              <Home className="w-4 h-4 mr-2" />
              {t("translation.layoutsError.error500.buttonhome")}
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-4">
            {t("translation.layoutsError.error500.description2")}
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
