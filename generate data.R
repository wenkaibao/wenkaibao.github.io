setwd("I:/d3 trials")

replicates=100

breed = c("Domestic Long Hair","Domestic Short Hair","Siamese","Maine Coon","Mixed")
x=c(1,2,3,4,5) #if design_matrix below has only one var breed, when repeat, weird things happen
#design matrix is the Cartesian product of the variables above#
design_matrix=data.frame(breed=breed,ind=x)

#each row is repeated 'replicates' times#
design_matrix=design_matrix[rep(seq_len(nrow(design_matrix)),each=replicates),]
row.names(design_matrix)=NULL

#body length#
body_length=c(rnorm(replicates,mean=50,sd=4)
              ,rnorm(replicates,mean=45,sd=2)
              ,rnorm(replicates,mean=55,sd=3)
              ,rnorm(replicates,mean=60,sd=3.5)
              ,rnorm(replicates,mean=48,sd=5))

body_weight=c(rnorm(replicates,mean=5.8,sd=.7)
              ,rnorm(replicates,mean=5,sd=.5)
              ,rnorm(replicates,mean=5,sd=.3)
              ,rnorm(replicates,mean=7,sd=.8)
              ,rnorm(replicates,mean=5.5,sd=.8))

design_matrix$length=body_length
design_matrix$weight=body_weight

#calculate the length weight ratio
design_matrix$lw_ratio=design_matrix$length/design_matrix$weight

write.table(design_matrix[,c("breed","length","weight","lw_ratio")],"data.csv",sep=",",quote=TRUE,col.names=TRUE,row.names=FALSE)
